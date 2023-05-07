const crypto = require('crypto');

module.exports = {
    generateJWT: (header, payload, secret) => {
        // Use Buffer.from to convert the string into binary data
        const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
        const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');

        // Use crypto.createHmac to hash the header and payload with the secret
        const signature = crypto
            .createHmac('sha256', secret)
            .update(`${encodedHeader}.${encodedPayload}`)
            .digest('base64url');

        return `${encodedHeader}.${encodedPayload}.${signature}`;
    },
    verifyJWT: (token, secret) => {
        const [encodedHeader, encodedPayload, signature] = token.split('.');

        const validSignature = crypto
            .createHmac('sha256', secret)
            .update(`${encodedHeader}.${encodedPayload}`)
            .digest('base64url');

        return signature === validSignature;
    },
    decodeJWT: (token) => {
        const [encodedHeader, encodedPayload] = token.split('.');

        // Decode the header and payload from base64url to JSON
        const header = JSON.parse(Buffer.from(encodedHeader, 'base64url').toString());
        const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString());

        return { header, payload };
    },
};
