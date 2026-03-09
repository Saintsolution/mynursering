import OpenAI from "openai";

let openai: OpenAI | null = null;
let systemInstruction = "";

export function initializeAssistant(apiKey: string, instruction: string) {
  openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true 
  });
  systemInstruction = instruction;
}

export async function getChatResponse(
  userMessage: string,
  history: { role: "user" | "assistant"; content: string }[]
): Promise<string> {
  if (!openai) return "Assistente não inicializado.";

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemInstruction },
        ...history,
        { role: "user", content: userMessage },
      ],
      temperature: 0.7,
    });

    return response.choices[0].message.content || "Sem resposta.";
  } catch (error: any) {
    console.error("Erro OpenAI:", error);
    return "A Dra. Maria Yvone teve um pequeno contratempo.";
  }
}