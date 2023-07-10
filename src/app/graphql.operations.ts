import { gql } from 'apollo-angular'


const CREATE_EMAIL = gql`
mutation {
    introduceSession {
        id,
        expiresAt,
        addresses {
          address
        }
    }
}
`


const GET_MAIL_INBOX = gql`
  query GetMailInbox($id: ID!) {
    session(id: $id) {
      mails {
        rawSize
        fromAddr
        toAddr
        downloadUrl
        text
        headerSubject
      }
    }
  }
`;



export {CREATE_EMAIL,GET_MAIL_INBOX}