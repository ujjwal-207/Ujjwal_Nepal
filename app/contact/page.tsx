import Footer from '@/components/Footer'
import Navbar from '@/components/navbar'
import Theme from '@/components/theme'
import React from 'react'

export default function Contact() {
  return (
    <Theme>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200 text-gray-900 dark:text-white font-sans">
        <div className="max-w-screen-md mx-auto px-4 md:px-6 lg:px-8">
          <Navbar />
          <h1 className="text-4xl font-bold mb-4 underline underline-offset-4 decoration-blue-500 mt-9">
            Get In Touch
          </h1>
          <h3 className="text-2xl font-semibold mb-2">
            Don’t be shy—awesome things start with a ‘hello’.
          </h3>

          <p className="mb-6 text-lg">
            I’m open to full-time work, freelance and collaborations.Whether you have a project in mind, want to collaborate, or just want to say hi—I’d love to hear from you. Let&apos;s create something amazing together!
          </p>

          {/* Mailto fallback */}
          <p className="mb-6 text-md">
            You can also reach me directly at: <a href="mailto:ujjwalnepal715@gmail.com" className="text-blue-500 underline">ujjwalnepal715@gmail.com</a>
          </p>

          {/* Contact Form using Formspree */}
          <form
            action="https://formspree.io/f/xwpolzzv" // <-- Replace this with your actual Formspree form ID
            method="POST"
            className="space-y-4"
          >
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                name="name"
                required
                className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Message</label>
              <textarea
                name="message"
                rows={5}
                required
                className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition-all"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      <Footer/>
    </Theme>
  )
}
