import React from 'react';
import Layout from '@/components/Layout';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Check, Facebook, Twitter } from 'lucide-react';

export default function GetInvolved() {
  return (
    <Layout>
      {/* Page Header */}
      <div className="bg-gray-100 py-12">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold">Get Involved</h1>
          <div className="flex items-center mt-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-primary">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-800">Get Involved</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Column */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Join Our Campaign</h2>
              <p className="mb-8 text-gray-700">
                Suspendisse sollicitudin velit sed leo. Ut pharetra augue nec augue. Nam elit agna, endrerit sit amet, tincidunt ac, viverra sed, nulla. Fields marked with an * are required.
              </p>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-control">
                    <label htmlFor="firstName" className="form-label">First name <span className="text-primary">*</span></label>
                    <input type="text" id="firstName" className="form-input" required />
                  </div>
                  <div className="form-control">
                    <label htmlFor="lastName" className="form-label">Last name <span className="text-primary">*</span></label>
                    <input type="text" id="lastName" className="form-input" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-control">
                    <label htmlFor="email" className="form-label">Email address <span className="text-primary">*</span></label>
                    <input type="email" id="email" className="form-input" required />
                  </div>
                  <div className="form-control">
                    <label htmlFor="phone" className="form-label">Phone number <span className="text-primary">*</span></label>
                    <input type="tel" id="phone" className="form-input" required />
                  </div>
                </div>

                <div className="form-control">
                  <label htmlFor="address" className="form-label">Address</label>
                  <input type="text" id="address" className="form-input" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-control">
                    <label htmlFor="city" className="form-label">City</label>
                    <input type="text" id="city" className="form-input" />
                  </div>
                </div>

                <div className="form-control">
                  <label className="form-label">How would you like to help out? <span className="text-primary">*</span></label>
                  <div className="checkbox-group">
                    <div className="checkbox-item">
                      <input type="checkbox" id="knockDoors" className="checkbox-input" />
                      <label htmlFor="knockDoors">Knock doors</label>
                    </div>
                    <div className="checkbox-item">
                      <input type="checkbox" id="writeLetters" className="checkbox-input" />
                      <label htmlFor="writeLetters">Write letters to the editor</label>
                    </div>
                    <div className="checkbox-item">
                      <input type="checkbox" id="workHQ" className="checkbox-input" />
                      <label htmlFor="workHQ">Work at HQ</label>
                    </div>
                    <div className="checkbox-item">
                      <input type="checkbox" id="makePhoneCalls" className="checkbox-input" />
                      <label htmlFor="makePhoneCalls">Make phone calls</label>
                    </div>
                    <div className="checkbox-item">
                      <input type="checkbox" id="hostFundraiser" className="checkbox-input" />
                      <label htmlFor="hostFundraiser">Host a Fundraiser</label>
                    </div>
                    <div className="checkbox-item">
                      <input type="checkbox" id="other" className="checkbox-input" />
                      <label htmlFor="other">Other</label>
                    </div>
                  </div>
                </div>

                <div className="form-control">
                  <label htmlFor="comments" className="form-label">Let us know any other comments you have!</label>
                  <textarea id="comments" rows={5} className="form-input"></textarea>
                </div>

                <div>
                  <Button type="submit" className="bg-secondary text-white hover:bg-secondary/90">
                    SIGN UP
                  </Button>
                </div>
              </form>

              <div className="mt-12 border-t pt-8">
                <h4 className="text-sm font-bold text-gray-600 mb-3">SHARE THIS:</h4>
                <div className="flex space-x-2">
                  <Link href="#" className="bg-blue-600 text-white p-2 rounded-sm">
                    <Facebook className="w-5 h-5" />
                  </Link>
                  <Link href="#" className="bg-blue-400 text-white p-2 rounded-sm">
                    <Twitter className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-secondary text-white p-6 mb-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-primary mr-4 rounded">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold uppercase">Register to vote</h3>
                    <p className="text-sm text-gray-200">Submit your application</p>
                  </div>
                </div>
                <Button className="w-full bg-white text-secondary hover:bg-gray-100">
                  Submit Application
                </Button>
              </div>

              <div className="bg-secondary text-white p-6 mb-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-primary mr-4 rounded">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold uppercase">Attend Events</h3>
                    <p className="text-sm text-gray-200">Find events near you</p>
                  </div>
                </div>
                <Button className="w-full bg-white text-secondary hover:bg-gray-100">
                  Find Events
                </Button>
              </div>

              <div className="bg-primary text-white p-6 mb-6">
                <h3 className="font-bold text-center mb-4 uppercase">Donate Now!</h3>
                <div className="flex justify-center space-x-2 mb-4">
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary">$5</Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary">$10</Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary">$25</Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary">Other</Button>
                </div>
                <Button className="w-full bg-secondary text-white hover:bg-secondary/90">
                  Donate
                </Button>
              </div>

              <div className="bg-gray-100 p-6">
                <h3 className="font-bold mb-4 text-xl">Latest News</h3>
                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-4">
                    <Link href="#" className="flex">
                      <div className="w-16 h-16 bg-secondary flex items-center justify-center mr-4 text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-secondary hover:text-primary transition-colors">Fusce euismod consequat ante</h4>
                        <p className="text-sm text-gray-600">4 November, 2023</p>
                      </div>
                    </Link>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <Link href="#" className="flex">
                      <div className="w-16 h-16 bg-secondary flex items-center justify-center mr-4 text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-secondary hover:text-primary transition-colors">Agna Endrerit Sit Amet</h4>
                        <p className="text-sm text-gray-600">4 November, 2023</p>
                      </div>
                    </Link>
                  </div>
                  <div>
                    <Link href="#" className="flex">
                      <div className="w-16 h-16 bg-secondary flex items-center justify-center mr-4 text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-secondary hover:text-primary transition-colors">Vestibulum Iaculis Lacinia Est</h4>
                        <p className="text-sm text-gray-600">4 November, 2023</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
