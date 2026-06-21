import api from "./AxiosInterceptor";

const BASE_URL =
    "http://localhost:8080/notes";

class LeadNoteService {

    addNote(note) {

        return api.post(
            `${BASE_URL}/add`,
            note
        );
    }

    getByLead(leadId) {

        return api.get(
            `${BASE_URL}/lead/${leadId}`
        );
    }

    deleteNote(noteId) {

        return api.delete(
            `${BASE_URL}/delete/${noteId}`
        );
    }
}

export default new LeadNoteService();