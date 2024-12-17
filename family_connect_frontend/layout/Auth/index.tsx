import { Center, MantineProvider, Stack } from '@mantine/core';
import Image from 'next/image';
import React, { ReactNode } from 'react';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';

type AuthProps = {
  children: ReactNode;
};

const AuthLayout = ({ children }: AuthProps) => {
  const [primaryColor, setPrimaryColor] = useLocalStorage<string>({
    key: 'mantine-preferred-color-dash-sparx',
    defaultValue: 'blue', // default primary color
    getInitialValueInEffect: true,
  });

  const [colorScheme, setColorScheme] = useLocalStorage<'light' | 'dark'>({
    key: 'mantine-color-scheme-dash-sparx',
    defaultValue: 'light', // default color scheme
    getInitialValueInEffect: true,
  });

  // Function to toggle between light and dark color schemes
  const toggleColorScheme = (value?: 'light' | 'dark') =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  // Hotkey for toggling color scheme using mod+J (Ctrl+J or Cmd+J)
  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <MantineProvider 
      theme={{ 
        primaryColor, 
        primaryShade: 8 
      }} 
      colorScheme={colorScheme} // <-- colorScheme is now a prop on MantineProvider
      withGlobalStyles 
      withNormalizeCSS
    >
      <Center
        style={{
          height: '100vh', // Full viewport height
          width: '100vw', // Full viewport width
          backgroundColor:
            colorScheme === 'dark' ? '#1A1B1E' : '#f8f9fa', // Updated color logic
          color: colorScheme === 'dark' ? '#fff' : '#000', // Change text color based on scheme
        }}
      >
        <Stack>
          <Center>
            <Image
              src="/favicon.png"
              alt="Geomap logo"
              width={76}
              height={76}
              style={{ objectFit: 'contain' }}
            />
          </Center>
          {children}
        </Stack>
      </Center>
    </MantineProvider>
  );
};

export default AuthLayout;
