import React from 'react';
import Sidebar from '@/components/sidebar/sidebar';
import Footer from '@/components/header/footer';
import Header from '@/components/header/header'; // Corrected import path for Footer
import Card from '@/components/card/card';

const IndexPage: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-grow">
        <Sidebar />
        <main className="flex-grow p-8 bg-gray-50 text-gray-800">
          {/* Main Content */}
          <Header/>
          <section className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            </div>
          </section>
        </main>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default IndexPage;
