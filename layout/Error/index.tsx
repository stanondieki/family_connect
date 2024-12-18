import React, { ReactNode, useEffect, useState } from 'react';
import { Center, MantineProvider, useMantineTheme, Box } from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { MantineColor } from "@mantine/styles/lib/theme/types/MantineColor";

type ErrorProps = {
    children: ReactNode;
};

const ErrorLayout = ({ children }: ErrorProps) => {
    const theme = useMantineTheme();
    const [primaryColor, setPrimaryColor] = useLocalStorage<MantineColor>({
        key: 'mantine-preferred-color-dash-sparx',
        defaultValue: 'blue',
        getInitialValueInEffect: true,
    });
    const [colorScheme, setColorScheme] = useLocalStorage<'light' | 'dark'>({
        key: 'mantine-color-scheme-dash-sparx',
        defaultValue: 'light',
        getInitialValueInEffect: true,
    });

    // Toggle color scheme
    const toggleColorScheme = (value?: 'light' | 'dark') =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    useHotkeys([['mod+J', () => toggleColorScheme()]]);

    // Create theme object with colorScheme and primaryColor
    const customTheme = {
        ...theme,
        colorScheme,
        colors: {
            ...theme.colors,
            [primaryColor]: theme.colors[primaryColor], // Ensures the primary color is used correctly
        },
    };

    return (
        <MantineProvider
            theme={customTheme}
        >
            <Box
                style={{
                    height: '100vh',
                    width: '100vw',
                    backgroundColor: colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors[primaryColor][0],
                    color: colorScheme === 'dark' ? theme.white : theme.colors.dark[8],
                }}
            >
                <Center style={{ height: '100%' }}>
                    {children}
                </Center>
            </Box>
        </MantineProvider>
    );
};

export default ErrorLayout;
