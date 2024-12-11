import Head from 'next/head';
import React from 'react';
import Sidebar from '@/components/sidebar/sidebar';
import Footer from '@/components/header/footer';
import Header from '@/components/header/header'; // Corrected import path for Footer
import Card from '@/components/card/card';

const IndexPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <Head>
        <title>Family Connect</title>
        <meta name="description" content="Discover and explore your family connections and heritage with Family Connect." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-grow">
        <Sidebar />

        <main className="flex-grow p-8">
          {/* Header */}
          <Header />

          {/* Hero Section */}
          <section className="bg-white p-8 rounded-lg shadow-md mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">Welcome to Family Connect</h1>
            <p className="text-lg text-gray-600 mb-6">
              Discover your family heritage, visualize relationships, and connect the dots in your family tree.
            </p>
            <button
              onClick={() => console.log('Get Started Clicked')}
              className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
            >
              Get Started
            </button>
          </section>

          {/* Card Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card
              title="Search for Family"
              description="Enter details of an unknown family member and discover how they are connected to your family tree."
              buttonText="Start Searching"
              onClick={() => console.log('Search clicked')}
            />
            <Card
              title="Design Your Tree"
              description="Visualize your family tree and uncover connections between relatives."
              buttonText="Create Tree"
              onClick={() => (window.location.href = './create_tree')}
            />
            <Card
              title="Family Insights"
              description="Learn more about your family heritage and relationships."
              buttonText="Explore"
              onClick={() => console.log('Insights clicked')}
            />
          </section>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default IndexPage;
