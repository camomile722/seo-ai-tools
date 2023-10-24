export const extractKeywords = async (text: string) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API}`,
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt:
                "Extract keywords from this text. Make the first letter of every word uppercase and separate with commas:\n\n" +
                text +
                "",
            temperature: 0.5, // higher temperature, the API will generate more creative and diverse responses
            max_tokens: 60, //maximum number of tokens or words that the API will return.
            top_p: 1.0, //control the diversity of the returned text.
            frequency_penalty: 0.8, //if you set a higher value for "frequency penalty," the API will be more likely to avoid being repetitive.
            presence_penalty: 0.0,
        }),
    };
    try {
        const res = await fetch(
            process.env.NEXT_PUBLIC_OPENAI_URL as string,
            options
        );
        const json = await res.json();
        const data = json.choices[0].text.trim();
        return data;
    } catch (e) {
        console.log(e);
    }
};

export const translateText = async (text: string, lang: string) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API}`,
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt:
                "Translate this text to " +
                lang +
                ":\n\n" +
                text +
                "\n\nEnglish:",
            temperature: 0.5, // higher temperature, the API will generate more creative and diverse responses
            max_tokens: 1000, //maximum number of tokens or words that the API will return.
            top_p: 1.0, //control the diversity of the returned text.
            frequency_penalty: 0.8, //if you set a higher value for "frequency penalty," the API will be more likely to avoid being repetitive.
            presence_penalty: 0.0,
        }),
    };

    try {
        const res = await fetch(
            process.env.NEXT_PUBLIC_OPENAI_URL as string,
            options
        );
        const json = await res.json();
        const data = json.choices[0].text.trim();
        return data;
    } catch (e) {
        console.log(e);
    }
};

export const summerizeText = async (text: string) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API}`,
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: "Summerize this text " + ":\n\n" + text,
            temperature: 0.5, // higher temperature, the API will generate more creative and diverse responses
            max_tokens: 1000, //maximum number of tokens or words that the API will return.
            top_p: 1.0, //control the diversity of the returned text.
            frequency_penalty: 0.8, //if you set a higher value for "frequency penalty," the API will be more likely to avoid being repetitive.
            presence_penalty: 0.0,
        }),
    };

    try {
        const res = await fetch(
            process.env.NEXT_PUBLIC_OPENAI_URL as string,
            options
        );
        const json = await res.json();
        const data = json.choices[0].text.trim();
        return data;
    } catch (e) {
        console.log(e);
    }
};
