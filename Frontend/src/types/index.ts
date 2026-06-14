// טיפוסים משותפים לכל צד הלקוח.
export interface Team {
    group_id: number;
    group_name: string;
}

export interface Meeting {
    meeting_id: number;
    group_id: number;
    start_time: string;
    end_time: string;
    description: string;
    room: string;
}

export interface MeetingPayload {
    group_id: number;
    start_time: string;
    end_time: string;
    description: string;
    room: string;
}

export interface ApiError {
    message: string;
}