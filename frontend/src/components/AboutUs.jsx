// src/AboutUs.js
import React from 'react';

const AboutUs = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  p-4">
      <h1 className="text-4xl font-bold mb-6">About Us</h1>
      <p className="text-lg text-center max-w-2xl mb-4">
        Welcome to AgreFarm, where we harness the power of technology to revolutionize agriculture. Our mission is to empower farmers and agricultural enthusiasts with innovative solutions that enhance crop production, improve sustainability, and promote food security.
      </p>
      
      <h2 className="text-2xl font-semibold mb-2">Who We Are</h2>
      <p className="text-lg text-center max-w-2xl mb-4">
        At AgreFarm, we are a dedicated team of agricultural experts, data scientists, and software developers passionate about bridging the gap between technology and farming. We understand the challenges faced by farmers today, from unpredictable weather patterns to soil health issues. Our goal is to provide smart, data-driven insights that help farmers make informed decisions.
      </p>
      
      <h2 className="text-2xl font-semibold mb-2">What We Do</h2>
      <p className="text-lg text-center max-w-2xl mb-4">
        Our flagship product is a sophisticated crop recommendation system powered by machine learning. By analyzing key agricultural factors such as nitrogen, phosphorus, potassium levels, temperature, humidity, pH, and rainfall, we deliver tailored crop suggestions that optimize yield and resource usage. Our system not only helps farmers select the right crops for their land but also contributes to sustainable farming practices.
      </p>
      <p className="text-lg text-center max-w-2xl mb-4">
        In addition to crop recommendations, we also offer a plant disease detection feature that utilizes advanced image recognition technology. This allows farmers to identify potential diseases in their crops early, enabling timely intervention and reducing crop loss.
      </p>
      
      <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
      <p className="text-lg text-center max-w-2xl mb-4">
        We envision a future where technology and agriculture work hand in hand to create a more sustainable and efficient food system. By leveraging data and machine learning, we aim to help farmers increase productivity, reduce waste, and promote environmental stewardship.
      </p>
      
      <h2 className="text-2xl font-semibold mb-2">Our Values</h2>
      <p className="text-lg text-center max-w-2xl mb-4">
        At AgreFarm, we are guided by core values that shape our approach:
      </p>
      <ul className="list-disc list-inside text-lg text-center max-w-2xl mb-4">
        <li>Innovation: We believe in continuous improvement and embracing new technologies.</li>
        <li>Sustainability: We are committed to promoting practices that protect our environment.</li>
        <li>Integrity: We uphold the highest standards of honesty and transparency in our work.</li>
        <li>Collaboration: We foster partnerships with farmers, researchers, and organizations to drive positive change.</li>
      </ul>
      
      <h2 className="text-2xl font-semibold mb-2">Our Team</h2>
      <p className="text-lg text-center max-w-2xl mb-4">
        Our diverse team brings together expertise from various fields, including agronomy, data science, software development, and business. We are united by our passion for agriculture and our commitment to making a difference in the lives of farmers.
      </p>
      
      <h2 className="text-2xl font-semibold mb-2">Community Involvement</h2>
      <p className="text-lg text-center max-w-2xl mb-4">
        We believe in giving back to the community. AgreFarm actively participates in local agricultural fairs, workshops, and educational programs to share knowledge and resources with farmers. We aim to empower communities by providing access to the latest agricultural technologies and practices.
      </p>
      
      <h2 className="text-2xl font-semibold mb-2">Join Us</h2>
      <p className="text-lg text-center max-w-2xl mb-4">
        Whether you are a farmer looking for guidance, a researcher interested in agricultural technology, or simply someone passionate about sustainable farming, we invite you to join us on this journey. Together, we can cultivate a better future for agriculture.
      </p>
      
      <p className="text-lg text-center max-w-2xl">
        Thank you for visiting AgreFarm. We look forward to growing together!
      </p>
    </div>
  );
};

export default AboutUs;