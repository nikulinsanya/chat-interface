import React from 'react'
import Home from './page'

describe('<Home />', () => {
  beforeEach(() => {
    cy.mount(<Home />);
  });
  it('renders the Chat component', () => {
    cy.get('div.chat-container').within(() => {
      cy.get('.chat-block').should('exist');
      cy.get('.chat-header').should('exist');
      cy.get('.chat-form').should('exist');
      cy.get('.chat-window').should('exist');
    });
  });
  it('contains a footer link to LinkedIn', () => {
    cy.get('footer a')
        .should('have.attr', 'href', 'https://www.linkedin.com/in/nikulinsanya/')
        .and('contain.text', 'https://www.linkedin.com/in/nikulinsanya/ →');
  });
  it('contains the globe image in the footer', () => {
    cy.get('footer img')
        .should('have.attr', 'src')
        .and('include', '/globe.svg');
  });

  it('should display the submitted message in the chat window', () => {
    const testMessage = 'Hello, this is a test message!';
    cy.get('input.chat-text')
        .type(testMessage);

    cy.get('form.chat-form').submit();

    cy.get('ul.messages-block')
        .should('contain.text', testMessage);
  });
})
