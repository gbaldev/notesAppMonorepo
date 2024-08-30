package com.notesapp.database
import io.realm.kotlin.types.RealmObject
import io.realm.kotlin.types.annotations.PrimaryKey
import java.util.UUID

class Note : RealmObject {
    @PrimaryKey
    var _id: String = UUID.randomUUID().toString()
    var title: String = ""
    var content: String = ""
    var createdAt: Long = System.currentTimeMillis()
    var editedAt: Long = System.currentTimeMillis()
    var userId: String? = null
    var priority: String = ""
    var isSynced: Boolean = false
    var status: String = NoteStatus.ACTIVE.name
}

enum class NoteStatus {
    ACTIVE,
    DELETED
}