//
//  DatabaseManager.swift
//  notesApp
//
//  Created by Gonzalo Baldassarre on 17/08/2024.
//

import RealmSwift

class DatabaseManager {
  static let shared = DatabaseManager()
  private var realm: Realm?
  private let dateFormatter: ISO8601DateFormatter = {
    let formatter = ISO8601DateFormatter()
    formatter.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
    return formatter
  }()

  private init() {
    do {
      let config = Realm.Configuration(schemaVersion: 1, migrationBlock: nil, deleteRealmIfMigrationNeeded: true)
      Realm.Configuration.defaultConfiguration = config
      realm = try Realm()
    } catch {
      print("Error initializing Realm: \(error)")
    }
  }

  private func executeOnMainQueue<T>(_ operation: @escaping () -> T) -> T {
    if Thread.isMainThread {
      return operation()
    } else {
      var result: T!
      DispatchQueue.main.sync {
        result = operation()
      }
      return result
    }
  }
    
  func createNote(title: String, content: String, userId: String?, priority: String, _id: String? = nil, status: String?, isSynced: Bool?, createdAt: String?, editedAt: String?) -> String {
    executeOnMainQueue {
      var _createdAt: Date
      if let createdAtString = createdAt,
         let date = self.dateFormatter.date(from: createdAtString) {
        print("this date \(createdAtString) \(date)")
        _createdAt = date
      } else {
        print("no - date")
        _createdAt = Date()
      }
      
      var _editedAt: Date
      if let editedAtString = editedAt,
         let date = self.dateFormatter.date(from: editedAtString) {
        _editedAt = date
      } else {
        _editedAt = _createdAt
      }
      
      
      let note = Note()
      note._id = _id ?? "LocalId-\(UUID().uuidString)"
      note.title = title
      note.content = content
      note.createdAt = _createdAt
      note.editedAt = _editedAt
      note.userId = userId
      note.priority = priority
      note.isSynced = isSynced ?? true
      note.status = status ?? NoteStatus.ACTIVE.rawValue
      
      do {
        try self.realm?.write {
          self.realm?.add(note, update: .modified)
        }
      } catch {
        print("Error saving note: \(error)")
      }
      
      return note._id
    }
  }
    
  func updateNote(_id: String, title: String, content: String, priority: String, status: String, isSynced: Bool?) {
    executeOnMainQueue {
      guard let note = self.realm?.object(ofType: Note.self, forPrimaryKey: _id) else { return }
      
      do {
        try self.realm?.write {
          note.title = title
          note.content = content
          note.editedAt = Date()
          note.priority = priority
          note.status = status
          note.isSynced = isSynced ?? true
        }
      } catch {
        print("Error updating note: \(error)")
      }
    }
  }
  
  func updateNotes(notesData: [NSDictionary]) {
    executeOnMainQueue {
      print("Updating data in batch")
      do {
        try self.realm?.write {
          for noteData in notesData {
            guard let id = noteData["_id"] as? String,
                  let note = self.realm?.object(ofType: Note.self, forPrimaryKey: id) else {
              print("Error: No se encontró la nota con el id \(String(describing: noteData["id"]))")
              continue
            }
            note.title = noteData["title"] as? String ?? ""
            note.content = noteData["content"] as? String ?? ""
            note.editedAt = Date()
            note.priority = noteData["priority"] as? String ?? ""
            note.status = noteData["status"] as? String ?? ""
            note.isSynced = noteData["isSynced"] as? Bool ?? true
          }
        }
      } catch {
        print("Error updating notes: \(error)")
      }
    }
  }
    
  func removeNote(_id: String) {
    executeOnMainQueue {
      print("Busxcnado note")
      guard let note = self.realm?.object(ofType: Note.self, forPrimaryKey: _id) else { return }
      print("Encontre la note")
      do {
        try self.realm?.write {
          self.realm?.delete(note)
        }
      } catch {
        print("Error deleting note: \(error)")
      }
    }
  }

  func deleteNote(_id: String, isSynced: Bool?) {
    executeOnMainQueue {
      print("trying to delete \(_id)")
      guard let note = self.realm?.object(ofType: Note.self, forPrimaryKey: _id) else { return }
      do {
        try self.realm?.write {
          note.status = NoteStatus.DELETED.rawValue
          note.isSynced = isSynced ?? true
        }
      } catch {
        print("Error deleting note: \(error)")
      }
    }
  }
  
  func getNotes() -> [Note] {
    executeOnMainQueue {
      return self.realm?.objects(Note.self).map { $0 } ?? []
    }
  }

  func getUnsyncedNotes() -> [Note] {
    executeOnMainQueue {
      return self.realm?.objects(Note.self).filter("isSynced == false").map { $0 } ?? []
    }
  }
    
  func createNotes(notes: [NSDictionary]) -> [String] {
    executeOnMainQueue {
      var createdIds: [String] = []
      
      do {
        try self.realm?.write {
          for noteData in notes {
            var createdAt: Date
            var editedAt: Date

            if let createdAtString = noteData["createdAt"] as? String,
               let date = self.dateFormatter.date(from: createdAtString) {
              createdAt = date
            } else {
              createdAt = Date()
            }
            
            if let editedAtString = noteData["editedAt"] as? String,
               let date = self.dateFormatter.date(from: editedAtString) {
              editedAt = date
            } else {
              editedAt = createdAt
            }
            
            
            let note = Note()
            note._id = noteData["_id"] as? String ?? UUID().uuidString
            note.title = noteData["title"] as? String ?? ""
            note.content = noteData["content"] as? String ?? ""
            note.createdAt = createdAt
            note.editedAt = editedAt
            note.userId = noteData["userId"] as? String
            note.priority = noteData["priority"] as? String ?? ""
            note.isSynced = noteData["isSynced"] as? Bool ?? true
            note.status = noteData["status"] as? String ?? ""
            
            self.realm?.add(note, update: .modified)
            createdIds.append(note._id)
          }
        }
      } catch {
        print("Error creating notes in batch: \(error)")
      }
      
      return createdIds
    }
  }
}
