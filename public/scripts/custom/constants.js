const ROW_HEIGHT = 24

const PAGE_SIZE_DEFAULT = 20

const PAGE_SIZE_OPTIONS = ['5', '10', '20', '50']

const SET_TIMEOUT_LOADER = 500

const PAGE_CONTENT_HEIGHT = 'calc(100vh - 55px - 152px)'

const MASTER_CODES = {
    USE_FLAG: 1,
    DEPT_TYPE: 6,
    EQUIP_KIND: 10,
}

const DETAIL_CODES = {
    USE_FLAG: {
        YES: 1,
        NO: 2,
    },
    USER_LVL: {
        ADMIN: 11,
        STAFF: 12,
        CALL_CENTER_STAFF: 13,
        APARTMENT_MANAGER: 14,
        GUEST: 15,
    },
    DEPT_TYPE: {
        DIVISION: 8,
        DEPARTMENT: 9,
        TEAM: 10,
    },
    EQUIP_KIND: {
        COMPUTER: 24,
        MONITOR: 25,
        WEBCAM: 26,
        PRINTER: 27,
        RFID_READER: 28,
        CASH_TERMINAL: 29,
        CARD_TERMINAL: 30,
        BANKNOTE_INSERTER: 31,
        BANKNOTE_DISPENSER: 32,
        COIN_INSERTER: 33,
        COIN_DISPENSER: 34,
    },
    PROG_STATUS: {
        RECEIPT: 84,
        COMPLETE_RECEIPT:85,
        COMPLETE: 86,
    },
    EMERGENCY_TYPE: {
        USUALLY: 87,
        FAST: 88,
        EMERGENCY: 89,
        IMMEDIATELY: 90,
    },
}
