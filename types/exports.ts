export type RowData = {
    id: string
    unit_code: string
    unit_name: string
    day: string
    time: string
    lecturer: string
    campus: string
    mode: string
    room: string
    group: string
}

export type TimetableType = {
    id: string
    name: string
    unit_code: string
    unit_name: string
    day: string
    start_time: string
    end_time: string
    lecturer: string
    campus: string
    mode_of_study: string
    lecture_room: string
    group: string
}

export type TimetableNameType = {
    batch_id: string
    name: string
}

export type SubscriptionType = {
    status: string
    tier: string
}

export type unitsType = {
    batch_count: number
}