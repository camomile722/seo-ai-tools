import type { NextPage } from "next";
import { Box, Flex, useToast, UseToastOptions } from "@chakra-ui/react";
import { useState } from "react";
import Wrapper from "src/components/Wrapper";
import { CustomAiInput } from "src/components/CustomAiInput";
import { selectLangOptions } from "src/utils/options";
import {
    extractKeywords,
    summerizeText,
    translateText,
} from "src/utils/functions";
import { Layout } from "src/components/Layout";

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

    const wordCount = (text: string) => {
        return text.split(" ").length;
    };

    const chekIfTextIsTooLong = (
        text: string,
        toastName: (options: UseToastOptions) => void
    ) => {
        if (wordCount(text) > 1000) {
            toastName({
                title: "Text is too long",
                description: "Please enter a text with less than 1000 words",
                status: "error",
                duration: 5000,
                isClosable: false,
            } as UseToastOptions);
            return;
        }
    };

    const checkIfTextIsEmpty = (
        text: string,
        toastName: (options: UseToastOptions) => void
    ) => {
        if (text === "") {
            toastName({
                title: "Please enter a text",
                status: "error",
                duration: 5000,
                isClosable: false,
            } as UseToastOptions);
            return;
        }
    };

    const handleKeywordExtraction = async () => {
        if (text === "") {
            checkIfTextIsEmpty(text, toast);
            return;
        }

        if (wordCount(text) > 1000) {
            chekIfTextIsTooLong(text, toast);
            return;
        }

        try {
            setLoading(true);
            const extractedKeywords = await extractKeywords(text);
            setKeywords(extractedKeywords);
        } catch (error) {
            toast({
                title: "Error extracting keywords",
                status: "error",
                duration: 5000,
                isClosable: false,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleTranslation = async () => {
        if (textToTranslate === "") {
            checkIfTextIsEmpty(textToTranslate, translateToast);
            return;
        }

        if (wordCount(textToTranslate) > 1000) {
            chekIfTextIsTooLong(textToTranslate, translateToast);
            return;
        }

        if (targetLanguage === "") {
            translateToast({
                title: "No language selected",
                status: "error",
                duration: 5000,
                isClosable: false,
            } as UseToastOptions);
            return;
        }

        try {
            setLoadingTranslate(true);
            const translatedText = await translateText(
                textToTranslate,
                targetLanguage
            );
            setTranslation(translatedText);
        } catch (error) {
            toast({
                title: "Error translating text",
                status: "error",
                duration: 5000,
                isClosable: false,
            });
        } finally {
            setLoadingTranslate(false);
        }
    };

    const handleSummerization = async () => {
        if (textToSummerize === "") {
            checkIfTextIsEmpty(textToSummerize, summerizeToast);
            return;
        }

        if (wordCount(textToSummerize) > 1000) {
            chekIfTextIsTooLong(textToSummerize, summerizeToast);
            return;
        }

        try {
            setLoadingSummerize(true);
            const summarized = await summerizeText(textToSummerize);
            setSummerizedText(summarized);
        } catch (error) {
            toast({
                title: "Error summarizing text",
                status: "error",
                duration: 5000,
                isClosable: false,
            });
        } finally {
            setLoadingSummerize(false);
        }
    };
    return (
        <Box bg="teal.50">
            <Layout metaTitle="SEO AI Tool" metaDescription="SEO AI Tool">
                <Wrapper>
                    <Flex flexDir="column" gap={10}>
                        <CustomAiInput
                            handleSubmit={handleKeywordExtraction}
                            title="AI Keyword Extractor"
                            loading={loading}
                            tooltip="Paste in your text below and we'll extract the keywords for you"
                            value={text}
                            setValue={setText}
                            result={keywords}
                            buttonLabel="Extract Keywords"
                        />

                        <CustomAiInput
                            handleSubmit={handleTranslation}
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
                            handleSubmit={handleSummerization}
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
            </Layout>
        </Box>
    );
};

export default Home;
