import type { Metadata } from 'next'
import { Inter, Josefin_Sans, Poppins } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from './utils/theme-provider'
import { Toaster } from 'react-hot-toast'


const poppins=Poppins({
  subsets:['latin'],
  weight:['400','500','600','700'], 
  variable:'--font-Poppins'
})

const josefin_sans=Josefin_Sans({
    subsets:['latin'],
    weight:['400','500','600','700'],
    variable:'--font-Josefin_Sans'

})

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${josefin_sans.variable} !bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300 bg-no-repeat`}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
        {children}
        <Toaster position='bottom-center' reverseOrder={false}/>
        </ThemeProvider>
      </body>
    </html>
  )
}
