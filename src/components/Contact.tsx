import React from 'react';

const ContactInfo: React.FC = () => {
  const contacts = [
    {
      type: 'Email',
      value: 'roshangautam@gautam-roshan.com.np',
      href: 'mailto:roshangautam@gautam-roshan.com.np',
    },
    {
      type: 'Phone',
      value: '+977 9848679873',
      href: 'tel:+9779848679873',
    },
    {
      type: 'GitHub',
      value: 'github.com/roshangautam07',
      href: 'https://github.com/roshangautam07',
    },
    {
      type: 'LinkedIn',
      value: 'linkedin.com/in/roshan-gautam-a236b636',
      href: 'https://linkedin.com/in/roshan-gautam-a236b636',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.222 0 22.225 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex justify-center flex-col items-center p-6 my-20" id="contact">
      <h2 className="text-2xl font-bold text-gray-900 mb-8  flex items-center justify-center">
        Contact
      </h2>
      <div className="space-y-4 bg-gray-50 border border-gray-200 rounded-xl p-8 shadow-sm w-full max-w-2xl">
        {contacts.map((contact, index) => (
          <a
            key={index}
            href={contact.href}
            target={contact.type !== 'Email' && contact.type !== 'Phone' ? '_blank' : undefined}
            rel={contact.type !== 'Email' && contact.type !== 'Phone' ? 'noopener noreferrer' : undefined}
            className="flex items-center  rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
          >
            {/* Fixed width container for the type label */}
            <div className="w-24 flex-shrink-0">
              <p className="text-sm font-medium text-gray-500">{contact.type}</p>
            </div>
            
            {/* Value text with consistent alignment */}
            <div className="flex-1">
              <p className="text-sm text-gray-900 bg-amber-200 inline-block px-2 py-0.5 rounded">
                {contact.value}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ContactInfo;