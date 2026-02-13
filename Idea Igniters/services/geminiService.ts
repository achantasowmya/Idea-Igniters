
import { GoogleGenAI, Type } from "@google/genai";
import { GeneratorInputs, Curriculum } from "../types";

const API_KEY = process.env.API_KEY || "";

export const generateCurriculum = async (inputs: GeneratorInputs): Promise<Curriculum> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const subjectsString = inputs.subjects.map(s => 
    `${s.name} (${s.lessons} lessons, Difficulty: ${s.difficulty})`
  ).join(', ');

  const prompt = `
    Create a high-precision personalized study plan for: "${inputs.skill}".
    Target Level: ${inputs.courseLevel}
    Industry Focus: ${inputs.industryFocus || 'General'}
    
    User Constraints:
    - Total Daily Study Commitment: ${inputs.dailyHours} hours.
    - Mastery Goal: ${inputs.completionGoal}.
    - Subject Inventory: ${subjectsString}.

    SCHEDULING LOGIC:
    1. Distribute the ${inputs.dailyHours} total daily hours among the subjects.
    2. 'Hard' subjects get significantly more daily time than 'Easy' subjects.
    3. For EACH subject, calculate:
       - 'dailyHoursPerSubject': How many hours of the ${inputs.dailyHours} are dedicated to this subject specifically per day.
       - 'estimatedDaysToComplete': Based on lessons count and daily hours for that subject.
       - 'totalSessionHours': The total number of hours spent on this subject over the entire duration (dailyHoursPerSubject * estimatedDaysToComplete).
    4. 'recommendedStudyStrategy' MUST be a clear-cut, actionable winning strategy.
    5. Organize into logical Phases (semesters).

    Output MUST be valid JSON.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          skill: { type: Type.STRING },
          level: { type: Type.STRING },
          industryFocus: { type: Type.STRING },
          dailyHours: { type: Type.NUMBER },
          completionGoal: { type: Type.STRING },
          timeDistributionSummary: {
            type: Type.OBJECT,
            properties: {
              totalWeeklyHours: { type: Type.NUMBER },
              hardSubjectAllocation: { type: Type.STRING },
              easySubjectAllocation: { type: Type.STRING },
              estimatedTotalDays: { type: Type.NUMBER }
            },
            required: ["totalWeeklyHours", "hardSubjectAllocation", "easySubjectAllocation", "estimatedTotalDays"]
          },
          semesters: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                number: { type: Type.INTEGER },
                courses: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      code: { type: Type.STRING },
                      credits: { type: Type.INTEGER },
                      description: { type: Type.STRING },
                      topics: { type: Type.ARRAY, items: { type: Type.STRING } },
                      dailyHoursPerSubject: { type: Type.NUMBER },
                      difficulty: { type: Type.STRING, enum: ["Hard", "Medium", "Easy"] },
                      recommendedStudyStrategy: { type: Type.STRING },
                      lessonsCount: { type: Type.NUMBER },
                      estimatedDaysToComplete: { type: Type.NUMBER },
                      totalSessionHours: { type: Type.NUMBER }
                    },
                    required: ["name", "code", "description", "topics", "dailyHoursPerSubject", "difficulty", "recommendedStudyStrategy", "lessonsCount", "estimatedDaysToComplete", "totalSessionHours"]
                  }
                }
              },
              required: ["number", "courses"]
            }
          },
          capstoneProject: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              outcomes: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["title", "description", "outcomes"]
          }
        },
        required: ["skill", "level", "semesters", "capstoneProject", "timeDistributionSummary"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("Failed to generate curriculum content");
  
  return JSON.parse(text) as Curriculum;
};
