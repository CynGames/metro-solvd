const db = require('../metro_db/db');

describe('Teardown', () => {
    afterAll(async () => {
        await db.pool.end();
    });

    test('should close db pool', () => {
        // This is a placeholder test.
        expect(true).toBe(true);
    });
});
