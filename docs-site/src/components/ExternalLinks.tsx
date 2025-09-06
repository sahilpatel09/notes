import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

interface ExternalLinksProps {
  youtube?: string;
  research_paper?: string;
  github?: string;
  documentation?: string;
}

const ExternalLinks: React.FC<ExternalLinksProps> = ({
  youtube,
  research_paper,
  github,
  documentation,
}) => {
  const hasLinks = youtube || research_paper || github || documentation;

  if (!hasLinks) {
    return null;
  }

  return (
    <div className="external-links-container" style={{
      margin: '20px 0',
      padding: '15px',
      border: '1px solid #e1e4e8',
      borderRadius: '6px',
      backgroundColor: '#f6f8fa',
    }}>
      <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', fontWeight: '600' }}>
        📚 External Resources
      </h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {youtube && (
          <a
            href={youtube}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '8px 12px',
              backgroundColor: '#ff0000',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            🎥 YouTube Video
          </a>
        )}
        {research_paper && (
          <a
            href={research_paper}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '8px 12px',
              backgroundColor: '#1a73e8',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            📄 Research Paper
          </a>
        )}
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '8px 12px',
              backgroundColor: '#24292e',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            💻 GitHub Repository
          </a>
        )}
        {documentation && (
          <a
            href={documentation}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '8px 12px',
              backgroundColor: '#0366d6',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            📖 Documentation
          </a>
        )}
      </div>
    </div>
  );
};

export default ExternalLinks;




