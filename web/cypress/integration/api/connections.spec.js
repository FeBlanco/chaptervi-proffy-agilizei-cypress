/// <reference types="cypress" />
/// <reference types="@bahmutov/cy-api" />

context('Connections endpoints', () => {
    it('GET - Obter total de conexões realizadas', () => {
        cy.api({
            method: 'GET',
            url: `${Cypress.config().apiUrl}/connections`
        }).then((response) => {
             // 1. Validação do status
            expect(response.status).to.eq(200)
             // 2. Validação da duração da request
            expect(response.duration).lessThan(20)
            expect(response.duration).lt(20)
            // 3.1. Validação das infromações retornadas no body
            expect(response.body)
                .to.have.property('total')
                .to.be.a('number')
                .greaterThan(2)
            // 3.2. Outra forma da validação do body retornando o valor
            expect(response.body.total)
                .an('number')
                .satisfy((totalValue) => { return totalValue >= 2})
            
            // 4. Validação de um dos Headers, o content-type
            expect(response.headers)
                .to.have.property('content-type')
                .an('string')
                .equal('application/json; charset=utf-8')

        })
    });
});