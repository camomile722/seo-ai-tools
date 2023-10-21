import type { NextPage } from "next";
import Head from "next/head";
import { Box, Flex, useToast } from "@chakra-ui/react";
import Header from "src/components/Header";
import Footer from "src/components/Footer";
import { useState } from "react";
import Wrapper from "src/components/Wrapper";
import { CustomAiInput } from "src/components/CustomAiInput";

const Home: NextPage = () => {
    const [keywords, setKeywords] = useState<string[]>([]);
    const [translation, setTranslation] = useState<string>("");
    const [summerizedText, setSummerizedText] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingTranslate, setLoadingTranslate] = useState<boolean>(false);
    const [loadingSummerize, setLoadingSummerize] = useState<boolean>(false);
    const [text, setText] = useState("");
    const [textToTranslate, setTextToTranslate] = useState("");
    const [textToSummerize, setTextToSummerize] = useState("");
    const [targetLanguage, setLang] = useState("");
    const toast = useToast();
    const translateToast = useToast();
    const summerizeToast = useToast();

    const selectLangOptions = [
        { value: "", label: "Select Language" },
        {
            value: "English",
            label: "English",
        },
        {
            value: "German",
            label: "German",
        },
        {
            value: "French",
            label: "French",
        },
        {
            value: "Spanish",
            label: "Spanish",
        },
        {
            value: "Italian",
            label: "Italian",
        },
    ];

    const wordCount = (text: string) => {
        return text.split(" ").length;
    };
    const extractKeywords = async (text: string) => {
        setLoading(true);

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
            setKeywords(data);
            setLoading(false);
        } catch (e) {
            console.log(e);
        }
    };
    const translate = async (text: string, lang: string) => {
        setLoadingTranslate(true);

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
            setTranslation(data);
            setLoadingTranslate(false);
        } catch (e) {
            console.log(e);
        }
    };
    const summerize = async (text: string) => {
        setLoadingSummerize(true);

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
            setSummerizedText(data);
            setLoadingSummerize(false);
        } catch (e) {
            console.log(e);
        }
    };
    const submitText = () => {
        if (text === "") {
            toast({
                title: "No text to extract keywords from",
                status: "error",
                duration: 5000,
                isClosable: false,
            } as any);
            return;
        } else if (wordCount(text) > 1000) {
            toast({
                title: "Text is too long",
                description: "Please enter a text with less than 1000 words",
                status: "error",
                duration: 5000,
                isClosable: false,
            } as any);
            return;
        }
        extractKeywords(text);
    };
    const submitTextToTranslate = () => {
        if (textToTranslate === "") {
            translateToast({
                title: "No text to translate",
                status: "error",
                duration: 5000,
                isClosable: false,
            } as any);
            return;
        } else if (targetLanguage === "") {
            translateToast({
                title: "No language selected",
                status: "error",
                duration: 5000,
                isClosable: false,
            } as any);

            return;
        } else if (wordCount(textToTranslate) > 1000) {
            translateToast({
                title: "Text is too long",
                description: "Please enter a text with less than 1000 words",
                status: "error",
                duration: 5000,
                isClosable: false,
            } as any);
            return;
        }

        translate(textToTranslate, targetLanguage);
    };

    const submitTextSummerize = () => {
        if (textToSummerize === "") {
            summerizeToast({
                title: "No text to summerize",
                status: "error",
                duration: 5000,
                isClosable: false,
            } as any);
            return;
        } else if (wordCount(textToSummerize) > 1000) {
            summerizeToast({
                title: "Text is too long",
                description: "Please enter a text with less than 1000 words",
                status: "error",
                duration: 5000,
                isClosable: false,
            } as any);
            return;
        }
        summerize(textToSummerize);
    };
    return (
        <>
            <Box bg="teal.50">
                <Head>
                    <title>SEO AI Tool</title>
                    <meta name="description" content="Next template" />
                    <link rel="icon" href="/public/favicon.ico" />
                </Head>
                <Header />
                <Box maxW="1440px" margin="0 auto">
                    <Wrapper>
                        <Flex flexDir="column" gap={10}>
                            <CustomAiInput
                                handleSubmit={submitText}
                                title="AI Keyword Extractor"
                                loading={loading}
                                tooltip="Paste in your text below and we'll extract the keywords for you"
                                value={text}
                                setValue={setText}
                                result={keywords}
                                buttonLabel="Extract Keywords"
                            />

                            <CustomAiInput
                                handleSubmit={submitTextToTranslate}
                                title="AI Translator"
                                loading={loadingTranslate}
                                tooltip="Paste in your text below and we'll translate it for you"
                                value={textToTranslate}
                                setValue={setTextToTranslate}
                                result={translation}
                                buttonLabel="Translate"
                                select
                                selectOptions={selectLangOptions}
                                onSelectChange={(e) => setLang(e.target.value)}
                            />

                            <CustomAiInput
                                handleSubmit={submitTextSummerize}
                                title="Summerize Text"
                                loading={loadingSummerize}
                                tooltip="Paste in your text below and we'll summerize it for you"
                                value={textToSummerize}
                                setValue={setTextToSummerize}
                                result={summerizedText}
                                buttonLabel="Summerize"
                            />
                        </Flex>
                    </Wrapper>
                </Box>
                <Footer />
            </Box>
        </>
    );
};

export default Home;
