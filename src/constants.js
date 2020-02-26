const constants = {
  UNDEF: `undefined`,
  STR: `string`,
  MDJSE: {
    APP_TITLE: `z3r0-mdjse`,
    MAX_MENU_LEN: 50,
    UUIDV4_LEN: 36,
    DIVIDER_STR: `░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░`,
    DATABASE: {
      DATABASE_FILE: `z3r0-mdjse-database.sqlite3`,
      TABLE_NAMES: {
        NOTES: `notes`
      }
    },
    ERROR_MSGS: {
      ERROR_DATABASE_COULD_NOT_CONNECT_DB_DOESNT_EXIST: `error: could not connect to database because it does not exist`,
      ERROR_DATABASE_EXPECTED_ARRAY: `error: expected typeof Array`,
      ERROR_DATABASE_NOT_CONNECTED: `error: database not connected`,
      ERROR_DATABASE_QUERY_RETURNED_NULL_OR_UNDEF: `error: query returned null or undefined`,
      ERROR_DATABASE_QUERY_EXPECTED_NO_MORE_THAN_ONE: `error: expected no more than one result from query`,
      ERROR_DATABASE_ATTEMPT_MADE_ON_NONEXIST_TABLE: `error: an attempt was made to access a table that does not exist`,
      ERROR_HTTP_REQUEST_RETURNED_NULL_OR_UNDEF: `error: http request returned null or undefined`
    }
  }
}
module.exports = constants
