import React from 'react';
import { Document, Page, Text, View, StyleSheet, pdf, Font, Link } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { CVData } from '../types';

// Register fonts
Font.register({
  family: 'TimesNewRoman',
  fonts: [
    { src: 'https://db.onlinewebfonts.com/t/32441506927e59825529507c9af41a92.woff2', fontWeight: 'normal' },
    { src: 'https://db.onlinewebfonts.com/t/3a7f3d5d15d0cd14d91f0a2eebff3796.woff2', fontWeight: 'bold' }
  ]
});

Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://fonts.cdnfonts.com/s/29107/Helvetica.woff', fontWeight: 'normal' },
    { src: 'https://fonts.cdnfonts.com/s/29107/Helvetica-Bold.woff', fontWeight: 'bold' }
  ]
});

Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://fonts.cdnfonts.com/s/13894/Roboto-Regular.woff', fontWeight: 'normal' },
    { src: 'https://fonts.cdnfonts.com/s/13894/Roboto-Bold.woff', fontWeight: 'bold' }
  ]
});

Font.register({
  family: 'Georgia',
  fonts: [
    { src: 'https://fonts.cdnfonts.com/s/7211/Georgia.woff', fontWeight: 'normal' },
    { src: 'https://fonts.cdnfonts.com/s/7211/Georgia-Bold.woff', fontWeight: 'bold' }
  ]
});

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'TimesNewRoman'
  } as Style,
  header: {
    marginBottom: 20
  } as Style,
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1
  } as Style,
  contact: {
    fontSize: 10,
    color: '#333',
    marginBottom: 3
  } as Style,
  section: {
    marginTop: 15,
    marginBottom: 10
  } as Style,
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
    borderBottom: '1px solid black',
    paddingBottom: 2,
    textTransform: 'capitalize'
  } as Style,
  experienceItem: {
    marginBottom: 10
  } as Style,
  companyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  } as Style,
  company: {
    fontSize: 12,
    fontWeight: 'bold'
  } as Style,
  positionLocation: {
    fontSize: 11,
    color: '#333',
    marginBottom: 2,
    fontStyle: 'italic'
  } as Style,
  date: {
    fontSize: 10,
    color: '#333',
    fontStyle: 'italic'
  } as Style,
  description: {
    fontSize: 10,
    marginTop: 3,
    lineHeight: 1.5,
    color: '#333'
  } as Style,
  skillsContainer: {
    marginTop: 5
  } as Style,
  skillCategory: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 4,
    marginTop: 8
  } as Style,
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5
  } as Style,
  skill: {
    fontSize: 10,
    padding: '3 8',
    backgroundColor: '#f0f0f0',
    borderRadius: 3
  } as Style,
  links: {
    flexDirection: 'row',
    marginTop: 3
  } as Style,
  link: {
    fontSize: 10,
    color: '#1a73e8',
    marginRight: 15,
    textDecoration: 'none'
  } as Style,
  bullet: {
    width: 15,
    textAlign: 'left',
    fontSize: 10,
    marginRight: 0
  } as Style,
  bulletText: {
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'flex-start',
    width: '100%',
    pageBreakInside: 'avoid'
  } as Style,
  paragraphText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 1.5
  } as Style,
  customSectionContent: {
    fontSize: 10,
    lineHeight: 1.5
  } as Style,
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    fontSize: 8,
    color: '#999',
    textAlign: 'center'
  } as Style,
  contactContainer: {
    marginTop: 15,
    marginBottom: 20,
    alignItems: 'center'
  } as Style,
  linksContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 5,
    gap: 4
  } as Style,
  contactGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  } as Style,
  contactIcon: {
    marginRight: 5,
    width: 12,
    textAlign: 'center'
  } as Style,
  contactLinkText: {
    fontSize: 10,
    color: '#333',
    textDecoration: 'none'
  } as Style,
  skillsItem: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 5
  } as Style,
  roleContainer: {
    marginBottom: 10,
    pageBreakInside: 'avoid'
  } as Style,
  roleTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 3
  } as Style,
  bulletPoints: {
    marginLeft: 10,
    pageBreakInside: 'avoid'
  } as Style
});

interface CVDocumentProps {
  cvData: CVData;
}

/**
 * Transforms bullet points in description text into an array of separate points
 * @param text The text to parse for bullet points
 * @param forceKeepParagraphs Whether to preserve paragraph format even without bullets
 * @returns Array of bullet points or paragraphs
 */
const extractBulletPoints = (text: string, forceKeepParagraphs: boolean = false): string[] => {
  if (!text) return [];
  
  // If the text already contains bullet points (•, *, -, or numbered)
  if (/•|\*|-|^\d+\.\s/m.test(text)) {
    // Split by common bullet point markers
    return text
      .split(/\r?\n/)
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => line.replace(/^[•\*\-]\s+/, '').replace(/^\d+\.\s+/, ''));
  }
  
  // If forceKeepParagraphs is true or this is for the education section,
  // keep the paragraph format without converting to bullet points
  if (forceKeepParagraphs) {
    return text
      .split(/\r?\n/)
      .map(line => line.trim())
      .filter(line => line.length > 0);
  }
  
  // For experience and other sections, treat each sentence as a point
  return text
    .split(/\.\s+/)
    .map(sentence => sentence.trim())
    .filter(sentence => sentence.length > 0)
    .map(sentence => sentence.endsWith('.') ? sentence : `${sentence}.`);
};

/**
 * Format date strings for display
 * @param dateString ISO date string or MM/YYYY format
 * @returns Formatted date string (Month Year)
 */
const formatDate = (dateString: string): string => {
  if (!dateString) return 'Present';
  
  // Handle different date formats
  if (dateString.toLowerCase() === 'present') {
    return 'Present';
  }
  
  let month, year;
  
  // Check if it's in MM/YYYY format
  if (dateString.includes('/')) {
    const [m, y] = dateString.split('/');
    month = parseInt(m, 10);
    year = parseInt(y, 10);
  } else {
    // Assume ISO format or similar
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      month = date.getMonth() + 1;
      year = date.getFullYear();
    }
  }
  
  return month && year ? `${getMonthName(month)} ${year}` : dateString;
};

/**
 * Convert month number to month name
 * @param month Month number (1-12)
 * @returns Month name
 */
const getMonthName = (month: number): string => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[(month - 1) % 12];
};

// Utility function to ensure URL has proper protocol
const getFullURL = (url: string, type: string): string => {
  if (!url) return '#';
  
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  switch (type) {
    case 'linkedin':
      return `https://linkedin.com/in/${url.replace('linkedin.com/in/', '')}`;
    case 'github':
      return `https://github.com/${url.replace('github.com/', '')}`;
    case 'portfolio':
      return `https://${url}`;
    default:
      return `https://${url}`;
  }
};

// Fix the bullet point rendering function
const renderBulletPointList = (content: string) => {
  return extractBulletPoints(content).map((point, i) => (
    <View key={`bullet-${i}`} style={styles.bulletText}>
      <Text style={styles.bullet}>• </Text>
      <Text style={styles.paragraphText}>{point}</Text>
    </View>
  ));
};

// Add dedicated LeadershipRole component
const LeadershipRole = ({ title, points, index }) => (
  <View key={index} style={styles.roleContainer}>
    {/* Role title */}
    <Text style={styles.roleTitle}>{title}</Text>
    {/* Points container with better alignment */}
    <View style={styles.bulletPoints}>
      {points.map((point, idx) => (
        <View key={idx} style={styles.bulletText}>
          <Text style={styles.bullet}>• </Text>
          <Text style={styles.paragraphText}>{point}</Text>
        </View>
      ))}
    </View>
  </View>
);

export const CVDocument: React.FC<CVDocumentProps> = ({ cvData }) => {
  // Default spacing value if not provided
  const spacing = cvData.styling?.spacing || 1;
  
  // Apply custom styling if available
  const pageStyle = {
    ...styles.page,
    fontFamily: cvData.styling?.font || 'TimesNewRoman',
    padding: 30 * spacing,
    backgroundColor: 'white' // Ensure consistent white background
  } as Style;
    
  const sectionTitleStyle = {
    ...styles.sectionTitle,
    color: cvData.styling?.primaryColor || '#000',
    marginBottom: 8 * spacing,
    borderBottom: '1px solid black',
    paddingBottom: 2
  } as Style;
    
  const skillStyle = {
    ...styles.skill,
    backgroundColor: cvData.styling?.secondaryColor || '#f0f0f0'
  } as Style;
  
  const sectionStyle = {
    ...styles.section,
    marginTop: 15 * spacing,
    marginBottom: 10 * spacing,
    backgroundColor: 'white' // Ensure consistent white background
  } as Style;

  // Find objective text from custom sections if present
  const objectiveSection = cvData.content.customSections?.find(
    section => section.title.toLowerCase().includes('objective')
  );

  // Extract leadership sections
  const leadershipSections = cvData.content.customSections?.filter(
    section => section.title.toLowerCase().includes('leadership')
  );

  // Extract other custom sections (not objective or leadership)
  const otherCustomSections = cvData.content.customSections?.filter(
    section => !section.title.toLowerCase().includes('objective') &&
              !section.title.toLowerCase().includes('leadership')
  );

  return (
    <Document>
      <Page size="A4" style={pageStyle}>
        {/* Header with personal information */}
        <View style={styles.header}>
          <Text style={styles.name}>{cvData.content.personal.fullName}</Text>
          
          {/* Contact information in rows with icons */}
          <View style={styles.contactContainer}>
            {/* First row: Location and Phone */}
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 5}}>
              <Text style={styles.contactIcon}>●</Text>
              <Text style={styles.contact}>{cvData.content.personal.location}</Text>
              <Text style={{marginHorizontal: 8}}>●</Text>
              <Text style={styles.contact}>{cvData.content.personal.phone}</Text>
            </View>
            
            {/* Email */}
            <View style={styles.contactGroup}>
              <Text style={styles.contactIcon}>✉</Text>
              <Link src={`mailto:${cvData.content.personal.email}`}>
                <Text style={styles.contactLinkText}>
                  {cvData.content.personal.email}
                </Text>
              </Link>
            </View>
            
            {/* LinkedIn */}
            {cvData.content.personal.linkedin && (
              <View style={styles.contactGroup}>
                <Text style={styles.contactIcon}>in</Text>
                <Link src={getFullURL(cvData.content.personal.linkedin, 'linkedin')}>
                  <Text style={styles.contactLinkText}>
                    {cvData.content.personal.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, 'linkedin.com/in/')}
                  </Text>
                </Link>
              </View>
            )}
            
            {/* Portfolio */}
            {cvData.content.personal.portfolio && (
              <View style={styles.contactGroup}>
                <Text style={styles.contactIcon}>◯</Text>
                <Link src={getFullURL(cvData.content.personal.portfolio, 'portfolio')}>
                  <Text style={styles.contactLinkText}>
                    {cvData.content.personal.portfolio === "Portfolio" 
                      ? "Portfolio" 
                      : "Portfolio"}
                  </Text>
                </Link>
              </View>
            )}
          </View>
        </View>

        {/* Objective Section */}
        {objectiveSection && (
          <View style={sectionStyle}>
            <Text style={sectionTitleStyle}>Objective</Text>
            <Text style={styles.description}>{objectiveSection.content}</Text>
          </View>
        )}

        {/* Education */}
        {cvData.content.education.length > 0 && (
          <View style={sectionStyle}>
            <Text style={sectionTitleStyle}>Education</Text>
            {cvData.content.education.map((edu, index) => (
              <View key={`edu-${index}`} style={styles.experienceItem}>
                <View style={styles.companyHeader}>
                  <Text style={styles.company}>
                    {edu.degree}{edu.field ? `, ${edu.field}` : ''}, {edu.school}
                    {edu.endDate && edu.endDate.toLowerCase().includes('expected') ? ` (${edu.endDate})` : edu.endDate ? ` (Expected ${edu.endDate})` : ''}
                  </Text>
                </View>
                {edu.description && (
                  <View style={{marginTop: 3}}>
                    {extractBulletPoints(edu.description, true).map((point, i) => {
                      // Check if the text contains bullet markers
                      const hasBulletMarker = point.trim().match(/^[•\*\-]/);
                      const isBranchLine = point.trim().startsWith('Branch:');
                      
                      // Use appropriate style for branch or bullet points
                      return (
                        <View 
                          key={`edu-point-${index}-${i}`} 
                          style={{
                            ...(hasBulletMarker ? styles.bulletText : styles.paragraphText),
                            alignItems: 'baseline'
                          }}
                        >
                          {hasBulletMarker && <Text style={{width: 10, marginRight: 2, lineHeight: 1.5}}>•</Text>}
                          <Text style={{
                            ...styles.description, 
                            flex: 1,
                            fontStyle: isBranchLine ? 'italic' : 'normal',
                            lineHeight: 1.5
                          }}>
                            {hasBulletMarker ? point.replace(/^[•\*\-]\s*/, '') : point}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Skills Section */}
        {(cvData.content.skills.technical || cvData.content.skills.soft || cvData.content.skills.languages) && (
          <View style={sectionStyle}>
            <Text style={sectionTitleStyle}>Skills</Text>
            
            {/* Languages/Technical skills */}
            {cvData.content.skills.technical && (
              <View style={styles.skillsItem}>
                <Text style={{...styles.description, fontWeight: 'bold', marginRight: 5}}>Languages:</Text>
                <Text style={styles.description}>{cvData.content.skills.technical}</Text>
              </View>
            )}
            
            {/* Soft Skills */}
            {cvData.content.skills.soft && (
              <View style={styles.skillsItem}>
                <Text style={{...styles.description, fontWeight: 'bold', marginRight: 5}}>Soft Skills:</Text>
                <Text style={styles.description}>{cvData.content.skills.soft}</Text>
              </View>
            )}
            
            {/* Languages */}
            {cvData.content.skills.languages && (
              <View style={styles.skillsItem}>
                <Text style={{...styles.description, fontWeight: 'bold', marginRight: 5}}>Languages:</Text>
                <Text style={styles.description}>{cvData.content.skills.languages}</Text>
              </View>
            )}
          </View>
        )}

        {/* Professional Experience */}
        {cvData.content.experience.length > 0 && (
          <View style={sectionStyle}>
            <Text style={sectionTitleStyle}>Professional Experience</Text>
            {cvData.content.experience.map((exp, index) => (
              <View key={`exp-${index}`} style={styles.experienceItem}>
                <View style={styles.companyHeader}>
                  <Text style={styles.company}>
                    {exp.company}
                  </Text>
                  <Text style={styles.date}>
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </Text>
                </View>
                <Text style={styles.positionLocation}>
                  {exp.position}{exp.location ? ` • ${exp.location}` : ''}
                </Text>
                <View style={{marginTop: 5}}>
                  {renderBulletPointList(exp.description)}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Leadership Sections */}
        {leadershipSections && leadershipSections.length > 0 && (
          <View style={{
            ...sectionStyle,
            backgroundColor: 'white',
            pageBreakInside: 'avoid'
          }}>
            <Text style={sectionTitleStyle}>Leadership</Text>
            
            {leadershipSections.map((section, sectionIndex) => {
              // Pre-process leadership content
              const lines = section.content.split('\n');
              const roles = [];
              let currentRole = null;
              
              // Process line by line more carefully
              for (const line of lines) {
                const trimmedLine = line.trim();
                if (!trimmedLine) continue;
                
                // Check if it's a bullet point
                const isBulletPoint = trimmedLine.match(/^[•\*\-]/);
                
                if (!isBulletPoint) {
                  // This is a new role title
                  if (currentRole) {
                    roles.push({...currentRole});
                  }
                  currentRole = { title: trimmedLine, points: [] };
                } else if (currentRole) {
                  // Add bullet point to current role
                  currentRole.points.push(trimmedLine.replace(/^[•\*\-]\s*/, ''));
                }
              }
              
              // Add the last role if exists
              if (currentRole) {
                roles.push(currentRole);
              }
              
              // Calculate how many roles can fit per page
              const rolesPerPage = 3; // Adjust based on testing
              
              // Process roles in separate chunks to avoid page breaks
              const roleChunks = [];
              for (let i = 0; i < roles.length; i += rolesPerPage) {
                roleChunks.push(roles.slice(i, i + rolesPerPage));
              }
              
              return roleChunks.map((chunk, chunkIndex) => (
                <View 
                  key={`chunk-${sectionIndex}-${chunkIndex}`} 
                  style={{ 
                    marginTop: chunkIndex > 0 ? 10 : 0,
                    pageBreakInside: 'avoid'
                  }} 
                  break={chunkIndex > 0}
                >
                  {chunk.map((role, roleIndex) => (
                    <LeadershipRole 
                      key={roleIndex} 
                      title={role.title} 
                      points={role.points} 
                      index={roleIndex}
                    />
                  ))}
                </View>
              ));
            })}
          </View>
        )}

        {/* Projects and Other Custom Sections */}
        {otherCustomSections && otherCustomSections.map((section, index) => (
          <View key={`section-${section.id || index}`} style={sectionStyle}>
            <Text style={sectionTitleStyle}>{section.title}</Text>
            
            {section.title.toLowerCase().includes('project') ? (
              // Projects format with title and bullet points
              section.content.split('\n\n').map((project, pIndex) => {
                const lines = project.split('\n');
                const projectTitle = lines[0];
                const projectDesc = lines.slice(1).join('\n');
                
                return (
                  <View key={`project-${pIndex}`} style={{marginBottom: 10}}>
                    <Text style={{...styles.company, marginBottom: 3}}>{projectTitle}</Text>
                    {renderBulletPointList(projectDesc)}
                  </View>
                );
              })
            ) : (
              // Generic section with bullet points
              renderBulletPointList(section.content)
            )}
          </View>
        ))}
        
        {/* Page Number */}
        <Text style={{
          position: 'absolute',
          bottom: 30,
          left: 0,
          right: 0,
          fontSize: 10,
          textAlign: 'center'
        }}>
          {1}
        </Text>
      </Page>
    </Document>
  );
};