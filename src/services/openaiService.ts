let systemInstruction = "";

export function initializeAssistant(_apiKey: string, instruction: string) {
  systemInstruction = instruction;
}

export async function getChatResponse(
  userMessage: string,
  history: { role: "user" | "assistant"; content: string }[]
): Promise<string> {
  try {
    const response = await fetch("/.netlify/functions/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userMessage,
        history,
        systemInstruction,
      }),
    });

    const data = await response.json();
    console.log("RESPOSTA DA FUNCTION:", data);

    if (!response.ok) {
      console.error("Erro da function:", data);
      return `Erro: ${data?.error || data?.reply || "falha interna"}`;
    }

    return data?.reply || "Sem resposta.";
  } catch (error: any) {
    console.error("Erro ao chamar a function:", error);
    return "A Dra. Maria Yvone teve um pequeno contratempo.";
  }
}