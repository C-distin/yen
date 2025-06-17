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
  Button,
} from '@react-email/components';

interface NewApplicationNotificationEmailProps {
  fullName: string;
  email: string;
  phoneNumber: string;
  cvFileName: string;
  coverLetter: string;
  positionApplied: string;
  applicationDate: string;
}

export const NewApplicationNotificationEmail: React.FC<NewApplicationNotificationEmailProps> = (props) => {
  const { fullName, email, phoneNumber, cvFileName, coverLetter, positionApplied, applicationDate } = props;

  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>New job application received from {fullName}</Preview>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] shadow-sm max-w-[700px] mx-auto p-[40px]">
            {/* Header */}
            <Section>
              <Heading className="text-[24px] font-bold text-gray-900 mb-[8px] text-center">
                New Job Application Received
              </Heading>
              <Text className="text-[16px] text-gray-600 text-center mb-[32px]">
                Application for: {positionApplied}
              </Text>
            </Section>

            {/* Candidate Information */}
            <Section className="bg-blue-50 rounded-[8px] p-[24px] mb-[24px] border-l-[4px] border-blue-500">
              <Heading className="text-[18px] font-semibold text-gray-900 mb-[16px]">
                Candidate Information
              </Heading>
              
              <Text className="text-[14px] text-gray-700 mb-[8px]">
                <strong>Full Name:</strong> {fullName}
              </Text>
              
              <Text className="text-[14px] text-gray-700 mb-[8px]">
                <strong>Email Address:</strong> {email}
              </Text>
              
              <Text className="text-[14px] text-gray-700 mb-[8px]">
                <strong>Phone Number:</strong> {phoneNumber}
              </Text>
              
              <Text className="text-[14px] text-gray-700 mb-[8px]">
                <strong>Application Date:</strong> {applicationDate}
              </Text>
              
              <Text className="text-[14px] text-gray-700">
                <strong>CV Attachment:</strong> {cvFileName}
              </Text>
            </Section>

            {/* Cover Letter */}
            <Section className="mb-[24px]">
              <Heading className="text-[18px] font-semibold text-gray-900 mb-[16px]">
                Cover Letter
              </Heading>
              <Section className="bg-gray-50 rounded-[8px] p-[20px] border-solid border-[1px] border-gray-200">
                <Text className="text-[14px] text-gray-700 leading-[1.6] whitespace-pre-line">
                  {coverLetter}
                </Text>
              </Section>
            </Section>

            {/* Action Buttons */}
            <Section className="text-center mb-[32px]">
              <Button
                href={`mailto:${email}?subject=Re: Application for ${positionApplied}`}
                className="bg-blue-600 text-white px-[24px] py-[12px] rounded-[6px] text-[14px] font-medium box-border mr-[12px]"
              >
                Contact Candidate
              </Button>
            </Section>

            {/* Application Summary */}
            <Section className="bg-gray-50 rounded-[8px] p-[20px] mb-[24px]">
              <Heading className="text-[16px] font-semibold text-gray-900 mb-[12px]">
                Application Summary
              </Heading>
              
              <Text className="text-[14px] text-gray-700 mb-[8px]">
                ✅ Application form completed
              </Text>
              
              <Text className="text-[14px] text-gray-700 mb-[8px]">
                ✅ CV/Resume attached ({cvFileName})
              </Text>
              
              <Text className="text-[14px] text-gray-700 mb-[8px]">
                ✅ Cover letter provided
              </Text>
              
              <Text className="text-[14px] text-gray-700">
                ✅ Contact information verified
              </Text>
            </Section>

            {/* Next Steps */}
            <Section className="mb-[24px]">
              <Heading className="text-[16px] font-semibold text-gray-900 mb-[12px]">
                Recommended Next Steps
              </Heading>
              
              <Text className="text-[14px] text-gray-700 mb-[8px]">
                1. Review the attached CV and cover letter
              </Text>
              
              <Text className="text-[14px] text-gray-700 mb-[8px]">
                2. Assess candidate qualifications against job requirements
              </Text>
              
              <Text className="text-[14px] text-gray-700 mb-[8px]">
                3. Schedule initial screening if candidate meets criteria
              </Text>
              
              <Text className="text-[14px] text-gray-700">
                4. Update application status in your tracking system
              </Text>
            </Section>

            <Hr className="border-gray-200 my-[24px]" />

            {/* System Information */}
            <Section>
              <Text className="text-[12px] text-gray-500">
                This application was submitted through your company career portal. The CV document is attached to this email for your review. Please ensure to follow your company's hiring policies and procedures when processing this application.
              </Text>
            </Section>

            {/* Footer */}
            <Hr className="border-gray-200 my-[24px]" />
            <Section>
              <Text className="text-[12px] text-gray-500 text-center m-0">
                Yendaakye Job Center | Company Name
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