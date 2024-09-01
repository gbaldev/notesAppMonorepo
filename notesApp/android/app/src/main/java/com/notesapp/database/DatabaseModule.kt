package com.notesapp.database
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeArray
import com.facebook.react.bridge.WritableNativeMap
import io.realm.kotlin.Realm
import io.realm.kotlin.RealmConfiguration
import io.realm.kotlin.ext.query
import io.realm.kotlin.types.RealmObject
import io.realm.kotlin.types.annotations.PrimaryKey
import org.mongodb.kbson.BsonDateTime
import org.mongodb.kbson.ObjectId
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale
import java.util.TimeZone
import java.util.UUID
import java.io.Serializable

class DatabaseModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val dateFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX", Locale.getDefault()).apply {
        timeZone = TimeZone.getDefault()
    }

    override fun getName() = "Database"

    private fun getIsSyncedValue(noteData: ReadableMap): Boolean {
        return if (noteData.hasKey("isSynced")) noteData.getBoolean("isSynced") else true
    }

    @ReactMethod
    fun getNotes(promise: Promise) {
        val notes = DatabaseManager.getNotes()
        val result = notes.map { noteToWritableMap(it) }
        promise.resolve(WritableNativeArray().apply { result.forEach { pushMap(it) } })
    }

    private fun noteToWritableMap(note: Note): WritableMap {
        return WritableNativeMap().apply {
            putString("_id", note._id)
            putString("title", note.title)
            putString("content", note.content)
            putString("createdAt", dateFormat.format(Date(note.createdAt)))
            putString("editedAt", dateFormat.format(Date(note.editedAt)))
            putString("userId", note.userId)
            putString("priority", note.priority)
            putBoolean("isSynced", note.isSynced)
            putString("status", note.status)
        }
    }

    @ReactMethod
    fun createNote(noteData: ReadableMap, promise: Promise) {
        val noteMap = mapOf(
            "_id" to noteData.getString("_id"),
            "title" to (noteData.getString("title") ?: ""),
            "content" to (noteData.getString("content") ?: ""),
            "createdAt" to (noteData.getString("createdAt")?.let { dateFormat.parse(it)?.time } ?: System.currentTimeMillis()),
            "editedAt" to (noteData.getString("editedAt")?.let { dateFormat.parse(it)?.time } ?: System.currentTimeMillis()),
            "userId" to (noteData.getString("userId") ?: ""),
            "priority" to (noteData.getString("priority") ?: ""),
            "isSynced" to getIsSyncedValue(noteData),
            "status" to (noteData.getString("status") ?: NoteStatus.ACTIVE.toString())
        )

        try {
            val createdId = DatabaseManager.createNote(
                title = noteMap["title"] as String,
                content = noteMap["content"] as String,
                userId = noteMap["userId"] as String?,
                priority = noteMap["priority"] as String,
                _id = noteMap["_id"] as String?,
                status = noteMap["status"] as String?,
                isSynced = noteMap["isSynced"] as Boolean?,
                createdAt = noteMap["createdAt"] as Long?,
                editedAt = noteMap["editedAt"] as Long?
            )
            promise.resolve(createdId)
        } catch (e: RuntimeException) {
            promise.reject("CREATE_NOTES_ERROR", e.message)
        }
    }

    @ReactMethod
    fun updateNote(noteData: ReadableMap, promise: Promise) {
        val _id = noteData.getString("_id") ?: run {
            promise.reject("ERROR", "No _id provided")
            return
        }

        val noteMap = mapOf(
            "_id" to _id,
            "title" to noteData.getString("title"),
            "content" to noteData.getString("content"),
            "priority" to noteData.getString("priority"),
            "status" to noteData.getString("status"),
            "isSynced" to getIsSyncedValue(noteData),
            "editedAt" to System.currentTimeMillis()
        )

        DatabaseManager.updateNote(
            _id = noteMap["_id"] as String,
            title = noteMap["title"] as String,
            content = noteMap["content"] as String,
            priority = noteMap["priority"] as String,
            status = noteMap["status"] as String,
            isSynced = noteMap["isSynced"] as Boolean?
        )

        promise.resolve(null)
    }

    @ReactMethod
    fun updateNotes(notesData: ReadableArray, promise: Promise) {
        val notesList = mutableListOf<Map<String, Any?>>()

        for (i in 0 until notesData.size()) {
            val noteData = notesData.getMap(i)
            val noteMap = mapOf(
                "_id" to noteData?.getString("_id"),
                "title" to noteData?.getString("title"),
                "content" to noteData?.getString("content"),
                "priority" to noteData?.getString("priority"),
                "status" to noteData?.getString("status"),
                "isSynced" to getIsSyncedValue(noteData ?: WritableNativeMap()),
                "editedAt" to System.currentTimeMillis()
            )
            notesList.add(noteMap)
        }

        DatabaseManager.updateNotes(notesList)
        promise.resolve(null)
    }

    @ReactMethod
    fun deleteNote(noteData: ReadableMap, promise: Promise) {
        val _id = noteData.getString("_id") ?: run {
            promise.reject("ERROR", "No _id provided")
            return
        }
        val isSynced = if (noteData.hasKey("isSynced")) noteData.getBoolean("isSynced") else true
        DatabaseManager.deleteNote(_id, isSynced)
        promise.resolve(null)
    }

    @ReactMethod
    fun getUnsyncedNotes(promise: Promise) {
        val notes = DatabaseManager.getUnsyncedNotes()
        val result = notes.map { noteToWritableMap(it) }
        promise.resolve(WritableNativeArray().apply { result.forEach { pushMap(it) } })
    }

    @ReactMethod
    fun removeNote(noteData: ReadableMap, promise: Promise) {
        val _id = noteData.getString("_id") ?: run {
            promise.reject("ERROR", "No _id provided")
            return
        }

        DatabaseManager.removeNote(_id)
        promise.resolve(null)
    }

    @ReactMethod
    fun createNotes(notesData: ReadableArray, promise: Promise) {
        val notesList = mutableListOf<Map<String, Any?>>()

        for (i in 0 until notesData.size()) {
            val noteData = notesData.getMap(i)
            if (noteData != null) {
                val noteMap = mapOf(
                    "_id" to noteData.getString("_id"),
                    "title" to noteData.getString("title"),
                    "content" to noteData.getString("content"),
                    "createdAt" to noteData.getString("createdAt")?.let { dateFormat.parse(it)?.time },
                    "editedAt" to noteData.getString("editedAt")?.let { dateFormat.parse(it)?.time },
                    "userId" to noteData.getString("userId"),
                    "priority" to noteData.getString("priority"),
                    "isSynced" to getIsSyncedValue(noteData),
                    "status" to noteData.getString("status")
                )
                notesList.add(noteMap)
            }
        }

        try {
            val createdIds = DatabaseManager.createNotes(notesList)
            promise.resolve(WritableNativeArray().apply { createdIds.forEach { pushString(it) } })
        } catch (e: RuntimeException) {
            promise.reject("CREATE_NOTES_ERROR", e.message)
        }
    }

    @ReactMethod
    fun drop(promise: Promise) {
        try {
            DatabaseManager.drop()
            promise.resolve(null)
        } catch (e: RuntimeException) {
            promise.reject("DROP_ERROR", e.message)
        }
    }
}
