import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
  Tailwind,
} from '@react-email/components';

export const ApplicationConfirmationEmail = (props) => {
  const { fullName, email, phoneNumber, cvFileName, coverLetterPreview } = props;

  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>Application received - Thank you for your submission</Preview>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
            {/* Header */}
            <Section>
              <Heading className="text-[24px] font-bold text-gray-900 mb-[24px] text-center">
                Application Received
              </Heading>
            </Section>

            {/* Main Content */}
            <Section>
              <Text className="text-[16px] text-gray-700 mb-[20px]">
                Dear {fullName},
              </Text>
              
              <Text className="text-[16px] text-gray-700 mb-[20px]">
                Thank you for submitting your application. We have successfully received all your documents and information. Here's a summary of what we received:
              </Text>
            </Section>

            {/* Application Details */}
            <Section className="bg-gray-50 rounded-[8px] p-[24px] mb-[24px]">
              <Heading className="text-[18px] font-semibold text-gray-900 mb-[16px]">
                Application Details
              </Heading>
              
              <Text className="text-[14px] text-gray-600 mb-[8px]">
                <strong>Full Name:</strong> {fullName}
              </Text>
              
              <Text className="text-[14px] text-gray-600 mb-[8px]">
                <strong>Email Address:</strong> {email}
              </Text>
              
              <Text className="text-[14px] text-gray-600 mb-[8px]">
                <strong>Phone Number:</strong> {phoneNumber}
              </Text>
              
              <Text className="text-[14px] text-gray-600 mb-[8px]">
                <strong>CV Document:</strong> {cvFileName}
              </Text>
              
              <Text className="text-[14px] text-gray-600">
                <strong>Cover Letter:</strong> Received and reviewed
              </Text>
            </Section>

            {/* Cover Letter Preview */}
            <Section className="mb-[24px]">
              <Heading className="text-[16px] font-semibold text-gray-900 mb-[12px]">
                Cover Letter Preview
              </Heading>
              <Text className="text-[14px] text-gray-600 italic bg-gray-50 p-[16px] rounded-[4px] border-l-[4px] border-blue-500">
                "{coverLetterPreview}..."
              </Text>
            </Section>

            {/* Next Steps */}
            <Section className="mb-[24px]">
              <Heading className="text-[16px] font-semibold text-gray-900 mb-[12px]">
                What happens next?
              </Heading>
              
              <Text className="text-[14px] text-gray-700 mb-[8px]">
                • Our hiring team will review your application within 3-5 business days
              </Text>
              
              <Text className="text-[14px] text-gray-700 mb-[8px]">
                • If your profile matches our requirements, we'll contact you for the next steps
              </Text>
              
              <Text className="text-[14px] text-gray-700 mb-[8px]">
                • You'll receive updates via email at {email}
              </Text>
            </Section>

            <Hr className="border-gray-200 my-[24px]" />

            {/* Contact Information */}
            <Section className="mb-[24px]">
              <Text className="text-[14px] text-gray-700">
                If you have any questions about your application, please don't hesitate to contact our HR team at hr@company.com or call us at +1 (555) 123-4567.
              </Text>
            </Section>

            <Section>
              <Text className="text-[14px] text-gray-700">
                Best regards,<br />
                The Hiring Team
              </Text>
            </Section>

            {/* Footer */}
            <Hr className="border-gray-200 my-[32px]" />
            <Section>
              <Text className="text-[12px] text-gray-500 text-center m-0">
                Company Name | 123 Business Street, City, State 12345
              </Text>
              <Text className="text-[12px] text-gray-500 text-center m-0 mt-[8px]">
                © 2025 Company Name. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};