import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = await fetch('http://localhost:5064/api/Owners', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        });
        if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
        }
        const owners = await response.json();
        const ownersWithId = Array.isArray(owners)
        ? owners.map((owner, index) => ({
            id: index + 1,
            ...owner
            }))
        : [];
        return NextResponse.json(ownersWithId);
    } catch (error) {
        console.error('Error fetching owners:', error);
        return NextResponse.json(
        { error: 'Failed to fetch owners' },
        { status: 500 }
        );
    }
}