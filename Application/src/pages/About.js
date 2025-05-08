import React from "react";

const About = () => {
  return (
    <div className="about-container" style={styles.container}>
      <h1 style={styles.heading}>About BloodWave</h1>
      <p style={styles.paragraph}>We connect donors and recipients for life-saving donations.</p>

      <h2 style={styles.subHeading}>Our Mission</h2>
      <p style={styles.paragraph}>
        At <strong>BloodWave</strong>, our mission is to provide a safe, efficient, and compassionate
        platform for people to donate blood and help save lives. We believe that every individual has
        the power to make a difference, and we’re committed to enabling that impact.
      </p>

      <h2 style={styles.subHeading}>Our Values</h2>
      <ul style={styles.list}>
        <li><strong>Compassion</strong>: We treat every donor, recipient, and volunteer with empathy and respect.</li>
        <li><strong>Integrity</strong>: Transparency and honesty are at the heart of everything we do.</li>
        <li><strong>Inclusivity</strong>: We strive to create a welcoming environment for people from all walks of life.</li>
        <li><strong>Excellence</strong>: We are dedicated to providing top-quality services and continuous improvement.</li>
      </ul>

      <h2 style={styles.subHeading}>Our History</h2>
      <p style={styles.paragraph}>
        <strong>BloodWave</strong> was founded in <em>[Enter Year]</em> by a group of passionate individuals in <em>[Enter City/Region]</em> who recognized
        the urgent need for a reliable and accessible blood donation network. Since then, we’ve grown
        into a leading platform connecting donors and recipients across the region.
      </p>

      <h2 style={styles.subHeading}>Our Team</h2>
      <p style={styles.paragraph}>
        Our team includes medical professionals, tech developers, coordinators, and volunteers who work
        together to ensure safe blood donation and effective matching between donors and recipients.
        Their passion fuels our mission every day.
      </p>

      <h2 style={styles.subHeading}>Our Impact</h2>
      <ul style={styles.list}>
        <li><strong>[Enter Number]</strong> lives saved through successful blood donations</li>
        <li><strong>[Enter Number]</strong> donations collected each year</li>
        <li><strong>[Enter Number]</strong> volunteers and staff supporting our cause</li>
      </ul>

      <h2 style={styles.subHeading}>Get Involved</h2>
      <p style={styles.paragraph}>
        Want to make a difference? Join us!
        <ul style={styles.list}>
          <li><strong>Become a Donor</strong>: Register online and help save lives.</li>
          <li><strong>Volunteer</strong>: Support events, logistics, and community outreach.</li>
          <li><strong>Donate</strong>: Your contributions help us expand and improve our services.</li>
        </ul>
      </p>

      <h2 style={styles.subHeading}>Contact Us</h2>
      <ul style={styles.contactList}>
        <li><strong>Phone</strong>: [Enter phone number]</li>
        <li><strong>Email</strong>: [Enter email address]</li>
        <li><strong>Address</strong>: [Enter physical address]</li>
      </ul>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "800px",
    margin: "auto",
    backgroundColor: "#fff",
    color: "#333",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Arial', sans-serif",
    lineHeight: "1.6",
  },
  heading: {
    fontSize: "2rem",
    color: "#e91e63", // Pink color
    textAlign: "center",
    marginBottom: "1rem",
  },
  subHeading: {
    fontSize: "1.5rem",
    color: "#e91e63",
    marginTop: "1.5rem",
  },
  paragraph: {
    fontSize: "1rem",
    marginBottom: "1rem",
    color: "#555",
  },
  list: {
    paddingLeft: "20px",
    marginBottom: "1rem",
    color: "#555",
  },
  contactList: {
    paddingLeft: "20px",
    listStyleType: "none",
    color: "#555",
  },
};

export default About;
