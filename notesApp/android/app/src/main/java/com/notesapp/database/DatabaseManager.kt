package com.notesapp.database
import io.realm.kotlin.Realm
import io.realm.kotlin.RealmConfiguration
import io.realm.kotlin.ext.query
import io.realm.kotlin.types.RealmObject
import io.realm.kotlin.types.annotations.PrimaryKey
import org.mongodb.kbson.BsonDateTime
import org.mongodb.kbson.ObjectId
import java.util.*

object DatabaseManager {
    private lateinit var realm: Realm

    init {
        val config = RealmConfiguration.create(schema = setOf(Note::class))
        realm = Realm.open(config)
    }

    fun createNote(title: String, content: String, userId: String?, priority: String, _id: String? = null, status: String?, isSynced: Boolean?, createdAt: Long?, editedAt: Long?): String {
        var noteId = ""
        try {
            realm.writeBlocking {
                val note = Note().apply {
                    this._id = _id ?: "LocalId-${UUID.randomUUID()}"
                    this.title = title
                    this.content = content
                    this.createdAt = createdAt ?: System.currentTimeMillis()
                    this.editedAt = editedAt ?: this.createdAt
                    this.userId = userId
                    this.priority = priority
                    this.isSynced = isSynced ?: true
                    this.status = status ?: NoteStatus.ACTIVE.name
                }
                copyToRealm(note)
                noteId = note._id
            }
        } catch (e: Exception) {
            throw RuntimeException("Error creating note: ${e.message}")
        }
        return noteId
    }

    fun updateNote(_id: String, title: String, content: String, priority: String, status: String, isSynced: Boolean?) {
        try {
            realm.writeBlocking {
                query<Note>("_id == $0", _id).first().find()?.let { note ->
                    note.title = title
                    note.content = content
                    note.editedAt = System.currentTimeMillis()
                    note.priority = priority
                    note.status = status
                    note.isSynced = isSynced ?: true
                }
            }
        } catch (e: Exception) {
            throw RuntimeException("Error updating note: ${e.message}")
        }
    }

    fun updateNotes(notesData: List<Map<String, Any?>>) {
        try {
            realm.writeBlocking {
                notesData.forEach { noteData ->
                    val id = noteData["_id"] as? String ?: return@forEach
                    query<Note>("_id == $0", id).first().find()?.let { note ->
                        note.title = noteData["title"] as? String ?: ""
                        note.content = noteData["content"] as? String ?: ""
                        note.editedAt = System.currentTimeMillis()
                        note.priority = noteData["priority"] as? String ?: ""
                        note.status = noteData["status"] as? String ?: ""
                        note.isSynced = noteData["isSynced"] as? Boolean ?: true
                    }
                }
            }
        } catch (e: Exception) {
            throw RuntimeException("Error updating notes: ${e.message}")
        }
    }

    fun removeNote(_id: String) {
        try {
            realm.writeBlocking {
                query<Note>("_id == $0", _id).first().find()?.let { delete(it) }
            }
        } catch (e: Exception) {
            throw RuntimeException("Error removing note: ${e.message}")
        }
    }

    fun deleteNote(_id: String, isSynced: Boolean?) {
        try {
            realm.writeBlocking {
                query<Note>("_id == $0", _id).first().find()?.let { note ->
                    note.status = NoteStatus.DELETED.name
                    note.isSynced = isSynced ?: true
                    note.editedAt = System.currentTimeMillis()
                }
            }
        } catch (e: Exception) {
            throw RuntimeException("Error deleting note: ${e.message}")
        }
    }

    fun getNotes(): List<Note> {
        return realm.query<Note>().find()
    }

    fun getUnsyncedNotes(): List<Note> {
        return realm.query<Note>("isSynced == false").find()
    }

    fun createNotes(notes: List<Map<String, Any?>>): List<String> {
        val createdIds = mutableListOf<String>()
        try {
            realm.writeBlocking {
                notes.forEach { noteData ->
                    val noteId = noteData["_id"] as? String ?: UUID.randomUUID().toString()
                    val existingNote = query<Note>("_id == $0", noteId).first().find()

                    val newEditedAt = noteData["editedAt"] as? Long ?: System.currentTimeMillis()

                    if (existingNote == null || newEditedAt > (existingNote?.editedAt ?: 0L)) {
                        val note = Note().apply {
                            _id = noteId
                            title = noteData["title"] as? String ?: ""
                            content = noteData["content"] as? String ?: ""
                            createdAt = (noteData["createdAt"] as? Long) ?: System.currentTimeMillis()
                            editedAt = newEditedAt
                            userId = noteData["userId"] as? String
                            priority = noteData["priority"] as? String ?: ""
                            isSynced = noteData["isSynced"] as? Boolean ?: true
                            status = noteData["status"] as? String ?: ""
                        }
                        copyToRealm(note)
                        createdIds.add(note._id)
                    }
                }
            }
        } catch (e: Exception) {
            throw RuntimeException("Error creating notes: ${e.message}")
        }
        return createdIds
    }

}