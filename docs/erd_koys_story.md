erDiagram
    USER ||--o{ MESSAGE : "envoie"
    USER {
        string email
        string password
        boolean is_admin
    }

    KOI ||--o{ KOI_TAG : "possède"
    KOI ||--o{ IMAGE : "illustré par"
    KOI {
        string variety
        integer size
        float price
        text description
        boolean is_available
    }

    TAG ||--o{ KOI_TAG : "définit"
    TAG {
        string name
    }

    KOI_TAG {
        integer koi_id
        integer tag_id
    }

    IMAGE {
        string cloudinary_id
        integer koi_id
    }

    MESSAGE {
        string sender_name
        string sender_email
        text content
        datetime created_at
    }