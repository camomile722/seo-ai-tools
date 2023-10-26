import {
    Button,
    Textarea,
    Box,
    Text,
    Tooltip,
    Flex,
    CircularProgress,
    Select,
} from "@chakra-ui/react";
import { Question } from "src/theme/icons";

export interface CustomAiInputProps {
    handleSubmit: () => void;
    loading: boolean;
    title: string;
    tooltip: string;
    value: string | string[];
    setValue: (value: string) => void;
    result?: string[] | string;
    buttonLabel: string;
    select?: boolean;
    selectOptions?: { value: string; label: string }[];
    onSelectChange?: (e: any) => void;
}

export const CustomAiInput = ({
    handleSubmit,
    title,
    tooltip,
    value,
    loading,
    setValue,
    result,
    buttonLabel,
    select,
    selectOptions,
    onSelectChange,
}: CustomAiInputProps) => {
    return (
        <Box maxW="100%">
            <Flex alignItems="center" gap="2" mb={2}>
                <Text color="gray.800" as="h2" fontSize="xl">
                    {title}
                </Text>
                <Tooltip
                    label={tooltip}
                    placement="top-start"
                    bg="gray.100"
                    color="teal"
                >
                    <Question boxSize="6" />
                </Tooltip>
            </Flex>

            <Flex gap={4} flexDir={{ base: "column", md: "row" }}>
                <Textarea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    boxShadow="lg"
                    height={200}
                    bg="white"
                    p={4}
                    width={{ base: "100%", md: "50%" }}
                />

                {loading ? (
                    <Flex
                        width={{ base: "100%", md: "50%" }}
                        boxShadow="lg"
                        justifyContent="center"
                    >
                        <CircularProgress
                            isIndeterminate
                            color="blue.300"
                            mt={10}
                        />
                    </Flex>
                ) : (
                    <Textarea
                        value={result}
                        isReadOnly
                        boxShadow="lg"
                        height={200}
                        width={{ base: "100%", md: "50%" }}
                        bg="white"
                        p={4}
                    />
                )}
            </Flex>

            <Flex
                gap={4}
                alignItems="center"
                marginTop={4}
                flexDir={{ base: "column", md: "row" }}
            >
                {select && selectOptions && (
                    <Select
                        width={{ base: "100%", md: "20%" }}
                        onChange={onSelectChange}
                        bg="white"
                    >
                        {selectOptions?.map((option) => (
                            <option value={option.value} key={option.label}>
                                {option.label}
                            </option>
                        ))}
                    </Select>
                )}

                <Button
                    colorScheme="teal"
                    width={{ base: "100%", md: "20%" }}
                    _hover={{ bg: "teal.300" }}
                    onClick={handleSubmit}
                >
                    {buttonLabel}
                </Button>
            </Flex>
        </Box>
    );
};
