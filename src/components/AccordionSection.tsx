import React from 'react';
import { Accordion } from 'react-bootstrap';

type AccordionItem = {
  title: string;
  content: string;
};

type AccordionSectionProps = {
  items: AccordionItem[];
};

const AccordionSection: React.FC<AccordionSectionProps> = ({ items }) => {
  return (
    <Accordion>
      {items.map((item, index) => (
        <Accordion.Item eventKey={index.toString()} key={index}>
          <Accordion.Header className="accordion-header">
          <span className="accordion-title">
              {item.title}
            </span>
            
            
          </Accordion.Header>
          <Accordion.Body>{item.content}</Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default AccordionSection;
