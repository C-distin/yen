import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
  Hr,
  Row,
  Column,
  Img,
} from "@react-email/components";

interface Props {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  inquiry: string;
  subject: string;
  message: string;
}

export function ContactFormEmail(props: Props) {
  const { firstName, lastName, email, phoneNumber, inquiry, subject, message } =
    props;

  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>
          New contact form submission from {firstName} {lastName} - Yendaakye
          Job Center
        </Preview>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] shadow-lg max-w-[600px] mx-auto p-[40px]">
            {/* Header with Logo and Company Name */}
            <Section className="text-center mb-[32px]">
              <Img
                src="/images/logo.png"
                alt="Yendaakye Job Center Logo"
                className="w-full h-auto object-cover max-w-[120px] mx-auto mb-[16px] rounded-[8px]"
              />
              <Heading className="text-[24px] font-bold text-teal-600 mb-[8px] m-0">
                Yendaakye Job Center
              </Heading>
              <Heading className="text-[20px] font-semibold text-gray-800 mb-[16px] m-0">
                New Contact Form Submission
              </Heading>
              <Hr className="border-gray-200 my-[24px]" />
            </Section>

            {/* Contact Information */}
            <Section className="mb-[32px]">
              <Heading className="text-[18px] font-bold text-gray-800 mb-[16px]">
                Contact Information
              </Heading>

              <Row className="mb-[12px]">
                <Column className="w-[120px]">
                  <Text className="text-[14px] font-semibold text-gray-600 m-0">
                    Name:
                  </Text>
                </Column>
                <Column>
                  <Text className="text-[14px] text-gray-900 m-0">
                    {firstName} {lastName}
                  </Text>
                </Column>
              </Row>

              <Row className="mb-[12px]">
                <Column className="w-[120px]">
                  <Text className="text-[14px] font-semibold text-gray-600 m-0">
                    Email:
                  </Text>
                </Column>
                <Column>
                  <Text className="text-[14px] text-gray-900 m-0">{email}</Text>
                </Column>
              </Row>

              <Row className="mb-[12px]">
                <Column className="w-[120px]">
                  <Text className="text-[14px] font-semibold text-gray-600 m-0">
                    Phone:
                  </Text>
                </Column>
                <Column>
                  <Text className="text-[14px] text-gray-900 m-0">
                    {phoneNumber}
                  </Text>
                </Column>
              </Row>

              <Row className="mb-[12px]">
                <Column className="w-[120px]">
                  <Text className="text-[14px] font-semibold text-gray-600 m-0">
                    Inquiry Type:
                  </Text>
                </Column>
                <Column>
                  <Text className="text-[14px] text-gray-900 m-0">
                    {inquiry}
                  </Text>
                </Column>
              </Row>
            </Section>

            <Hr className="border-gray-200 my-[24px]" />

            {/* Message Details */}
            <Section className="mb-[32px]">
              <Heading className="text-[18px] font-bold text-gray-800 mb-[16px]">
                Message Details
              </Heading>

              <Row className="mb-[16px]">
                <Column className="w-[120px]">
                  <Text className="text-[14px] font-semibold text-gray-600 m-0">
                    Subject:
                  </Text>
                </Column>
                <Column>
                  <Text className="text-[14px] text-gray-900 m-0 font-semibold">
                    {subject}
                  </Text>
                </Column>
              </Row>

              <Text className="text-[14px] font-semibold text-gray-600 mb-[8px]">
                Message:
              </Text>
              <Section className="bg-gray-50 p-[16px] rounded-[6px] border-l-[4px] border-blue-500">
                <Text className="text-[14px] text-gray-900 m-0 leading-[1.6] whitespace-pre-wrap">
                  {message}
                </Text>
              </Section>
            </Section>

            <Hr className="border-gray-200 my-[24px]" />

            {/* Footer */}
            <Section>
              <Text className="text-[12px] text-gray-500 text-center m-0">
                This message was sent via the Yendaakye Job Center website
                contact form.
              </Text>
              <Text className="text-[12px] text-gray-500 text-center m-0 mt-[8px]">
                Please respond directly to {email} to continue the conversation.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
