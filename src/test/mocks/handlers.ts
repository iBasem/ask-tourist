import { http, HttpResponse } from 'msw';

// Define handlers for Supabase API endpoint mocks
export const handlers = [
  // Auth API mocks
  http.post('*/auth/v1/token*', () => {
    return HttpResponse.json({
      access_token: 'mock-access-token',
      token_type: 'bearer',
      expires_in: 3600,
      refresh_token: 'mock-refresh-token',
      user: {
        id: 'mock-user-id',
        email: 'test@example.com',
      },
    });
  }),

  // Profiles API mocks
  http.get('*/rest/v1/profiles*', () => {
    return HttpResponse.json([
      {
        id: 'mock-profile-id',
        user_id: 'mock-user-id',
        role: 'customer',
        email: 'test@example.com',
        full_name: 'Test User',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);
  }),

  // Fallback for unhandled requests
  http.all('*', ({ request }) => {
    console.error(`Unhandled ${request.method} request to ${request.url}`);
    return HttpResponse.error();
  }),
];
