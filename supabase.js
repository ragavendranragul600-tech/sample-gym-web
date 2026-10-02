/* ========================================
   IRONFORGE FITNESS - SUPABASE CONFIG
   ======================================== */

/*
 * Frontend Supabase connection.
 *
 * Uses only the Supabase publishable/browser key.
 * NEVER put a Supabase secret/service key here.
 */

class SupabaseClient {

    constructor(supabaseUrl, supabaseKey) {

        if (!supabaseUrl || !supabaseKey) {
            throw new Error('Supabase credentials are missing.');
        }

        this.url = supabaseUrl;
        this.key = supabaseKey;
        this.apiUrl = `${supabaseUrl}/rest/v1`;
    }

    /*
     * Generic REST API request
     */
    async request(method, endpoint, data = null, options = {}) {

        const url = `${this.apiUrl}/${endpoint}`;

        const headers = {
            'Content-Type': 'application/json',
            'apikey': this.key,
            'Authorization': `Bearer ${this.key}`,
            ...options.headers
        };

        const config = {
            method,
            headers
        };

        if (
            data &&
            (method === 'POST' ||
             method === 'PATCH' ||
             method === 'PUT')
        ) {
            config.body = JSON.stringify(data);
        }

        try {

            const response = await fetch(url, config);

            if (!response.ok) {

                let errorMessage = `HTTP Error: ${response.status}`;

                try {
                    const errorData = await response.json();

                    if (errorData.message) {
                        errorMessage = errorData.message;
                    } else if (errorData.error) {
                        errorMessage = errorData.error;
                    }

                } catch {
                    // Response wasn't JSON
                }

                throw new Error(errorMessage);
            }

            const responseBody = await response.text();

            return responseBody
                ? JSON.parse(responseBody)
                : null;

        } catch (error) {

            console.error('Supabase API Error:', error);

            throw error;
        }
    }

    /*
     * Insert data into a table
     */
    async insert(table, data) {

        return this.request(
            'POST',
            table,
            data
        );
    }

    /*
     * Select data
     *
     * Kept for future admin functionality.
     * Public users should NOT have SELECT permission.
     */
    async select(table, options = {}) {

        let endpoint = table;

        if (options.select) {
            endpoint += `?select=${options.select}`;
        }

        return this.request(
            'GET',
            endpoint
        );
    }

    /*
     * Update data
     */
    async update(table, data, matchObject) {

        let endpoint = table + '?';

        for (const [key, value] of Object.entries(matchObject)) {

            endpoint += `${key}=eq.${encodeURIComponent(value)}&`;
        }

        return this.request(
            'PATCH',
            endpoint,
            data
        );
    }

    /*
     * Delete data
     */
    async delete(table, matchObject) {

        let endpoint = table + '?';

        for (const [key, value] of Object.entries(matchObject)) {

            endpoint += `${key}=eq.${encodeURIComponent(value)}&`;
        }

        return this.request(
            'DELETE',
            endpoint
        );
    }
}


/* ========================================
   SUPABASE INITIALIZATION
   ======================================== */

const SUPABASE_URL = window.SUPABASE_URL || '';
const SUPABASE_KEY = window.SUPABASE_KEY || '';

let supabase = null;

if (SUPABASE_URL && SUPABASE_KEY) {

    try {

        supabase = new SupabaseClient(
            SUPABASE_URL,
            SUPABASE_KEY
        );

        console.log('✓ Supabase client initialized');

    } catch (error) {

        console.error(
            '✗ Supabase initialization failed:',
            error
        );
    }

} else {

    console.warn(
        '⚠ Supabase credentials not found.'
    );
}


/* ========================================
   DATABASE SERVICE
   ======================================== */

class DatabaseService {

    /*
     * Submit Contact Enquiry
     */
    static async submitContactEnquiry(data) {

        if (!supabase) {
            throw new Error(
                'Supabase is not configured'
            );
        }

        if (!data.name || !data.phone || !data.email) {

            throw new Error(
                'Name, phone, and email are required'
            );
        }

        if (!this.isValidEmail(data.email)) {

            throw new Error(
                'Invalid email format'
            );
        }

        if (!this.isValidPhone(data.phone)) {

            throw new Error(
                'Invalid phone number format'
            );
        }

        const result = await supabase.insert(
            'contact_enquiries',
            {
                name: data.name.trim(),
                phone: data.phone.trim(),
                email: data.email.trim(),
                interested_program:
                    data.interested_program || null,
                message:
                    data.message || null,
                created_at:
                    new Date().toISOString()
            }
        );

        return result;
    }


    /*
     * Submit Trial Request
     */
    static async submitTrialRequest(data) {

        if (!supabase) {
            throw new Error(
                'Supabase is not configured'
            );
        }

        if (!data.name || !data.phone || !data.email) {

            throw new Error(
                'Name, phone, and email are required'
            );
        }

        if (!this.isValidEmail(data.email)) {

            throw new Error(
                'Invalid email format'
            );
        }

        if (!this.isValidPhone(data.phone)) {

            throw new Error(
                'Invalid phone number format'
            );
        }

        const result = await supabase.insert(
            'trial_requests',
            {
                name: data.name.trim(),
                phone: data.phone.trim(),
                email: data.email.trim(),
                preferred_date:
                    data.preferred_date || null,
                program:
                    data.program || null,
                created_at:
                    new Date().toISOString()
            }
        );

        return result;
    }


    /*
     * Email validation
     */
    static isValidEmail(email) {

        const regex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return regex.test(email);
    }


    /*
     * Phone validation
     */
    static isValidPhone(phone) {

        const cleaned =
            phone.replace(/\D/g, '');

        return cleaned.length >= 10;
    }


    /*
     * Check Supabase configuration
     */
    static isConfigured() {

        return supabase !== null;
    }


    /*
     * Get connection status
     */
    static getStatus() {

        if (!supabase) {

            return {
                configured: false,
                message:
                    'Supabase is not configured'
            };
        }

        return {
            configured: true,
            url: supabase.url,
            message:
                'Supabase is properly configured'
        };
    }
}


/* ========================================
   GLOBAL ACCESS
   ======================================== */

window.DatabaseService = DatabaseService;
window.SupabaseClient = SupabaseClient;


/* ========================================
   STATUS LOG
   ======================================== */

console.log(
    'Database Service Status:',
    DatabaseService.getStatus()
);