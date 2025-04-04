import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const mainIssues = [
  {
    id: 'protecting-seniors',
    title: 'Protecting Seniors',
    description: 'Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Donec rutrum congue leo eget malesuada. Curabitur',
    image: 'https://ext.same-assets.com/77511177/2240474230.jpeg',
  },
  {
    id: 'protecting-medicare',
    title: 'Protecting Medicare',
    description: 'Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Proin eget tortor risus. Quisque velit nisi, pretium',
    image: 'https://ext.same-assets.com/77511177/1529725074.jpeg',
  },
  {
    id: 'creating-jobs',
    title: 'Creating Jobs',
    description: 'Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Curabitur aliquet quam id dui posuere blandit. Quisque velit',
    image: 'https://ext.same-assets.com/77511177/616072021.jpeg',
  },
  {
    id: 'growing-our-economy',
    title: 'Growing Our Economy',
    description: 'Cras ultricies ligula sed magna dictum porta. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Lorem ipsum',
    image: 'https://ext.same-assets.com/77511177/2446538560.jpeg',
  },
];

const otherIssues = [
  {
    id: 'protecting-seniors-and-consumers',
    title: 'Protecting Seniors and Consumers',
    content: 'Donec eget tellus non erat lacinia. Donec in velit vel ipsum auctor pulvinar. Vestibulum iaculis lacinia est. Proin dictum elementum velit. Fusce euismod consequat ante. Lorem ipsum dolor sit amet, consectetuer adipis. Mauris accumsan nulla vel diam. Sed in lacus ut enim adipiscing aliquet. Nulla venenatis. In pede mi, aliquet sit amet, euismod in, auctor ut, ligula. Aliquam dapibus tincidunt metus. Aenean nec eros. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse sollicitudin velit sed leo. Ut pharetra augue nec augue.',
  },
  {
    id: 'promoting-public-safety',
    title: 'Promoting Public Safety',
    content: 'Donec eget tellus non erat lacinia. Donec in velit vel ipsum auctor pulvinar. Vestibulum iaculis lacinia est. Proin dictum elementum velit. Fusce euismod consequat ante. Lorem ipsum dolor sit amet, consectetuer adipis. Mauris accumsan nulla vel diam. Sed in lacus ut enim adipiscing aliquet. Nulla venenatis. In pede mi, aliquet sit amet, euismod in, auctor ut, ligula. Aliquam dapibus tincidunt metus. Aenean nec eros. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse sollicitudin velit sed leo. Ut pharetra augue nec augue.',
  },
  {
    id: 'preserving-clean-air-and-water',
    title: 'Preserving Clean Air and Water',
    content: 'Donec eget tellus non erat lacinia. Donec in velit vel ipsum auctor pulvinar. Vestibulum iaculis lacinia est. Proin dictum elementum velit. Fusce euismod consequat ante. Lorem ipsum dolor sit amet, consectetuer adipis. Mauris accumsan nulla vel diam. Sed in lacus ut enim adipiscing aliquet. Nulla venenatis. In pede mi, aliquet sit amet, euismod in, auctor ut, ligula. Aliquam dapibus tincidunt metus. Aenean nec eros. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse sollicitudin velit sed leo. Ut pharetra augue nec augue.',
  },
];

export default function Issues() {
  return (
    <Layout>
      {/* Page Header */}
      <div className="bg-gray-100 py-12">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold">Issues</h1>
          <div className="flex items-center mt-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-primary">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-800">Issues</span>
          </div>
        </div>
      </div>

      {/* Main Issues */}
      <div className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Main Issues</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mainIssues.map((issue) => (
              <div key={issue.id} className="issue-card">
                <div className="relative">
                  <Image
                    src={issue.image}
                    alt={issue.title}
                    width={360}
                    height={260}
                    className="issue-card-image"
                  />
                </div>
                <div className="issue-card-content">
                  <Link href={`/issues/${issue.id}`}>
                    <h3 className="issue-card-title">{issue.title}</h3>
                  </Link>
                  <p className="issue-card-text">{issue.description}</p>
                  <Link href={`/issues/${issue.id}`} className="read-more-link">
                    Read More <ArrowRight className="h-4 w-4 ml-1 inline" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Other Issues */}
      <div className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Other Issues</h2>

          <div className="space-y-8">
            {otherIssues.map((issue) => (
              <div key={issue.id} className="bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-secondary">{issue.title}</h3>
                <p className="text-gray-700 mb-4">{issue.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-12 bg-primary text-white text-center">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Get Involved Today</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Join our campaign and help us move Texas forward! We need your support to make a real difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-primary hover:bg-gray-100">
              Register to Vote
            </Button>
            <Button className="bg-secondary text-white hover:bg-secondary/90">
              Volunteer
            </Button>
            <Button className="border-2 border-white bg-transparent hover:bg-white hover:text-primary">
              Donate
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
