import { query, pool } from "../lib/db";

const seedJobs = async () => {
  console.log("Seeding fake jobs...");
  
  const jobs = [
    {
      title: "Email Marketing",
      company: "Revolut",
      logoUrl: "/Company/talkit 1.png", // Fallback talkit logo
      location: "Madrid, Spain",
      category: "Marketing",
      description: "Revolut is looking for an Email Marketing Specialist to help driven customer engagement and retention through targeted email campaigns.",
    },
    {
      title: "Brand Designer",
      company: "Dropbox",
      logoUrl: "/Company/talkit 1.png", // Fallback
      location: "San Francisco, US",
      category: "Design",
      description: "Dropbox is looking for a Brand Designer to help document and evolve our brand identity.",
    },
    {
      title: "Visual Designer",
      company: "Blinkist",
      logoUrl: "/Company/amber 1.png", // Fallback
      location: "Granada, Spain",
      description: "Blinkist is looking for a Visual Designer to help create compelling visual content for our marketing materials.",
      category: "Design",
    },
    {
      title: "Product Designer",
      company: "ClassPass",
      logoUrl: "/Company/talkit 1.png",
      location: "Manchester, UK",
      category: "Design",
      description: "ClassPass is looking for a Product Designer to enhance our user experience across all platforms.",
    },
    {
      title: "Lead Designer",
      company: "Canva",
      logoUrl: "/Company/talkit 1.png",
      location: "Ontario, Canada",
      category: "Design",
      description: "Canva is looking for a Lead Designer to head up design operations for new product features.",
    },
    {
      title: "Brand Strategist",
      company: "GoDaddy",
      logoUrl: "/Company/talkit 1.png",
      location: "Marseille, France",
      category: "Marketing",
      description: "GoDaddy is looking for a Brand Strategist to redefine our global brand positioning.",
    },
    {
      title: "Data Analyst",
      company: "Twitter",
      logoUrl: "/Company/talkit 1.png",
      location: "San Diego, US",
      category: "Business",
      description: "Twitter is looking for a Data Analyst to help understand trends in user engagement.",
    },
    {
      title: "Social Media Assistant",
      company: "Nomad",
      logoUrl: "/Company/talkit 1.png",
      location: "Paris, France",
      category: "Marketing",
      description: "Nomad is looking for a Social Media Assistant to manage our active community presence.",
    },
    {
      title: "Interactive Developer",
      company: "Terraform",
      logoUrl: "/Company/talkit 1.png",
      location: "Hamburg, Germany",
      category: "Engineering",
      description: "Terraform is looking for an Interactive Developer to build highly engaging web experiences.",
    },
    {
      title: "HR Manager",
      company: "Packer",
      logoUrl: "/Company/talkit 1.png",
      location: "Lucerne, Switzerland",
      category: "Human Resource",
      description: "Packer is looking for an HR Manager to help scale our talented team.",
    },
  ];

  try {
    for (const job of jobs) {
      await query(
        'INSERT INTO "Job" (title, company, "logoUrl", location, category, description) VALUES ($1, $2, $3, $4, $5, $6)',
        [job.title, job.company, job.logoUrl, job.location, job.category, job.description]
      );
    }
    console.log("Successfully seeded", jobs.length, "jobs.");
  } catch (error) {
    console.error("Error seeding jobs:", error);
  } finally {
    await pool.end();
  }
};

seedJobs();
