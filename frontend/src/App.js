import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming axios is installed for the API call
import { Mail, Send, User, MessageSquare, CheckCircle, XCircle, Loader2 } from 'lucide-react'; // Importing icons for UI components

// Define your API URL. In a real app, this would be configured more robustly
// For Canvas environment, we'll just use a placeholder or remove it if not strictly needed for UI demo
// FIX: Removed process.env.REACT_APP_API_URL as 'process' is not defined in the browser environment.
const API = 'http://localhost:5000'; // Fallback to localhost if not set

// Main App component
const App = () => {
  // --- API Health Check State and Effect ---
  const [apiStatus, setApiStatus] = useState(null);

  useEffect(() => {
    // Only attempt to fetch if API is defined
    if (API) {
      axios.get(`${API}/api/status`)
        .then((res) => {
          setApiStatus(res.data);
        })
        .catch((err) => {
          console.error("Failed to fetch API status:", err);
          setApiStatus({ success: false, message: "Failed to fetch API status" });
        });
    } else {
      // This else block might not be strictly necessary now that API is hardcoded,
      // but kept for logical completeness if API were dynamic.
      setApiStatus({ success: false, message: "API URL not configured (REACT_APP_API_URL)" });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-12 text-center">Modern UI Components</h1>

      {/* API Health Check Section */}
      <section className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-8 mb-12 border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">API Health Check</h2>
        {apiStatus ? (
          <div className="text-lg">
            <p className="mb-2">
              <strong className="font-semibold">Status:</strong>{' '}
              {apiStatus.success ? <span className="text-green-600">✅ OK</span> : <span className="text-red-600">❌ Failed</span>}
            </p>
            <p className="mb-2">
              <strong className="font-semibold">Message:</strong> {apiStatus.message}
            </p>
            {apiStatus.timestamp && (
              <p className="text-gray-600 text-sm">
                <strong className="font-semibold">Time:</strong> {new Date(apiStatus.timestamp).toLocaleString()}
              </p>
            )}
          </div>
        ) : (
          <p className="text-gray-600">Loading API status...</p>
        )}
      </section>

      {/* Buttons Section */}
      <section className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-8 mb-12 border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Buttons</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          {/* Primary Button */}
          <Button variant="primary">
            <Send className="w-5 h-5 mr-2" /> Send Message
          </Button>
          {/* Secondary Button */}
          <Button variant="secondary">
            <Mail className="w-5 h-5 mr-2" /> Learn More
          </Button>
          {/* Outlined Button */}
          <Button variant="outline">
            View Details
          </Button>
          {/* Danger Button */}
          <Button variant="danger">
            <XCircle className="w-5 h-5 mr-2" /> Delete Item
          </Button>
          {/* Success Button */}
          <Button variant="success">
            <CheckCircle className="w-5 h-5 mr-2" /> Confirm Action
          </Button>
          {/* Disabled Button */}
          <Button variant="primary" disabled>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Loading...
          </Button>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-8 mb-12 border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Contact Form</h2>
        <ContactForm />
      </section>

      {/* Leads Section */}
      <section className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Recent Leads</h2>
        <LeadsList />
      </section>
    </div>
  );
};

// Button Component
const Button = ({ children, variant = 'primary', disabled = false, onClick }) => {
  const baseClasses = "flex items-center justify-center px-6 py-3 rounded-full font-semibold transition-all duration-300 ease-in-out transform hover:-translate-y-1 active:translate-y-0 focus:outline-none focus:ring-4";
  let variantClasses = '';

  switch (variant) {
    case 'primary':
      variantClasses = 'bg-indigo-600 text-white shadow-md hover:bg-indigo-700 focus:ring-indigo-500/50';
      break;
    case 'secondary':
      variantClasses = 'bg-gray-200 text-gray-800 shadow-md hover:bg-gray-300 focus:ring-gray-400/50';
      break;
    case 'outline':
      variantClasses = 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500/50';
      break;
    case 'danger':
      variantClasses = 'bg-red-600 text-white shadow-md hover:bg-red-700 focus:ring-red-500/50';
      break;
    case 'success':
      variantClasses = 'bg-green-600 text-white shadow-md hover:bg-green-700 focus:ring-green-500/50';
      break;
    default:
      variantClasses = 'bg-indigo-600 text-white shadow-md hover:bg-indigo-700 focus:ring-indigo-500/50';
  }

  const disabledClasses = disabled ? 'opacity-60 cursor-not-allowed' : '';

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${disabledClasses}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// Contact Form Component
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    subscribe: false,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    // Clear error for the field when user starts typing
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    }
  };

  // Validate form data
  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form data submitted:', formData);
      // Here you would typically send data to a backend
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        message: '',
        subscribe: false,
      });
      setTimeout(() => setSubmitted(false), 3000); // Hide success message after 3 seconds
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Success message */}
      {submitted && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md relative" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline ml-2">Your message has been sent.</span>
        </div>
      )}

      {/* Name Input */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          <User className="inline-block w-4 h-4 mr-1 text-gray-500" /> Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`mt-1 block w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          placeholder="John Doe"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      {/* Email Input */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          <Mail className="inline-block w-4 h-4 mr-1 text-gray-500" /> Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`mt-1 block w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          placeholder="you@example.com"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      {/* Message Textarea */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          <MessageSquare className="inline-block w-4 h-4 mr-1 text-gray-500" /> Message
        </label>
        <textarea
          id="message"
          name="message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          className={`mt-1 block w-full px-4 py-2 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          placeholder="Your message here..."
        ></textarea>
        {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
      </div>

      {/* Checkbox */}
      <div className="flex items-center">
        <input
          id="subscribe"
          name="subscribe"
          type="checkbox"
          checked={formData.subscribe}
          onChange={handleChange}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label htmlFor="subscribe" className="ml-2 block text-sm text-gray-900">
          Subscribe to our newsletter
        </label>
      </div>

      {/* Submit Button */}
      <div>
        <Button type="submit" variant="primary">
          <Send className="w-5 h-5 mr-2" /> Submit Form
        </Button>
      </div>
    </form>
  );
};

// Leads List Component
const LeadsList = () => {
  // Mock data for leads
  const [leads, setLeads] = useState([
    { id: 1, name: 'Alice Smith', email: 'alice@example.com', status: 'New', date: '2023-10-26' },
    { id: 2, name: 'Bob Johnson', email: 'bob@example.com', status: 'Contacted', date: '2023-10-25' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', status: 'Qualified', date: '2023-10-24' },
    { id: 4, name: 'Diana Prince', email: 'diana@example.com', status: 'New', date: '2023-10-23' },
  ]);

  // Function to get status badge classes
  const getStatusBadge = (status) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-800';
      case 'Contacted':
        return 'bg-yellow-100 text-yellow-800';
      case 'Qualified':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {leads.map((lead) => (
        <div key={lead.id} className="bg-gray-50 rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900">{lead.name}</h3>
            <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusBadge(lead.status)}`}>
              {lead.status}
            </span>
          </div>
          <p className="text-gray-600 text-sm mb-2 flex items-center">
            <Mail className="w-4 h-4 mr-2 text-gray-500" /> {lead.email}
          </p>
          <p className="text-gray-500 text-xs flex items-center">
            <CheckCircle className="w-4 h-4 mr-2 text-gray-500" /> Added on {lead.date}
          </p>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => console.log('View lead:', lead.id)} className="text-sm px-4 py-2">View</Button>
            <Button variant="secondary" onClick={() => console.log('Edit lead:', lead.id)} className="text-sm px-4 py-2">Edit</Button>
          </div>
        </div>
      ))}
      {leads.length === 0 && (
        <p className="text-gray-600 text-center col-span-full">No leads found.</p>
      )}
    </div>
  );
};

export default App;
