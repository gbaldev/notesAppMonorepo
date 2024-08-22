//
//  Note.swift
//  notesApp
//
//  Created by Gonzalo Baldassarre on 17/08/2024.
//

import RealmSwift

enum NoteStatus: String {
    case ACTIVE = "ACTIVE"
    case DELETED = "DELETED"
}

class Note: Object {
    @objc dynamic var _id = ""
    @objc dynamic var title = ""
    @objc dynamic var content = ""
    @objc dynamic var createdAt = Date()
    @objc dynamic var editedAt = Date()
    @objc dynamic var userId: String?
    @objc dynamic var priority = ""
    @objc dynamic var isSynced = false
    @objc dynamic var status = NoteStatus.ACTIVE.rawValue
    
    override static func primaryKey() -> String? {
        return "_id"
    }
}
