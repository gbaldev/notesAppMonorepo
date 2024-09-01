//
//  Database.swift
//  notesApp
//
//  Created by Gonzalo Baldassarre on 17/08/2024.
//

import Foundation

@objc(Database)
class Database: NSObject {
  private let dateFormatter: ISO8601DateFormatter = {
    let formatter = ISO8601DateFormatter()
    formatter.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
    return formatter
  }()
  
  @objc func getNotes(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    DispatchQueue.main.async {
      let notes = DatabaseManager.shared.getNotes()
      resolve(notes.map { self.noteToDict($0) })
    }
  }
  
  @objc func createNote(_ noteData: NSDictionary, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    DispatchQueue.main.async {
      let id = DatabaseManager.shared.createNote(
        title: noteData["title"] as? String ?? "",
        content: noteData["content"] as? String ?? "",
        userId: noteData["userId"] as? String,
        priority: noteData["priority"] as? String ?? "",
        _id: noteData["_id"] as? String,
        status: noteData["status"] as? String ?? "",
        isSynced: noteData["isSynced"] as? Bool ?? true,
        createdAt: noteData["createdAt"] as? String ?? nil,
        editedAt: noteData["editedAt"] as? String ?? nil
      )
      resolve(id)
    }
  }
  
  @objc func updateNote(_ noteData: NSDictionary, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    DispatchQueue.main.async {
      guard let _id = noteData["_id"] as? String else {
        reject("ERROR", "No _id provided", nil)
        return
      }
      
      DatabaseManager.shared.updateNote(
        _id: _id,
        title: noteData["title"] as? String ?? "",
        content: noteData["content"] as? String ?? "",
        priority: noteData["priority"] as? String ?? "",
        status: noteData["status"] as? String ?? "",
        isSynced: noteData["isSynced"] as? Bool ?? true
      )
      resolve(nil)
    }
  }
  
  @objc func updateNotes(_ notesData: [NSDictionary], resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    DispatchQueue.main.async {
      DatabaseManager.shared.updateNotes(notesData: notesData)
      resolve(nil)
    }
  }
  
  @objc func deleteNote(_ noteData: NSDictionary, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    DispatchQueue.main.async {
      guard let _id = noteData["_id"] as? String else {
        reject("ERROR", "No _id provided", nil)
        return
      }
      DatabaseManager.shared.deleteNote(_id: _id, isSynced: noteData["isSynced"] as? Bool ?? true)
      resolve(nil)
    }
  }
  
  @objc func removeNote(_ noteData: NSDictionary, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    DispatchQueue.main.async {
      guard let _id = noteData["_id"] as? String else {
        reject("ERROR", "No _id provided", nil)
        return
      }
      DatabaseManager.shared.removeNote(_id: _id)
      resolve(nil)
    }
  }
  
  @objc func getUnsyncedNotes(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    DispatchQueue.main.async {
      let notes = DatabaseManager.shared.getUnsyncedNotes()
      resolve(notes.map { self.noteToDict($0) })
    }
  }

  @objc func createNotes(_ notesData: [NSDictionary], resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    DispatchQueue.main.async {
      let createdIds = DatabaseManager.shared.createNotes(notes: notesData)
      resolve(createdIds)
    }
  }

  @objc func drop(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    DispatchQueue.main.async {
      DatabaseManager.shared.drop()
      resolve(nil) 
    }
  }

  private func noteToDict(_ note: Note) -> [String: Any] {
    return [
      "_id": note._id,
      "title": note.title,
      "content": note.content,
      "createdAt": dateFormatter.string(from: note.createdAt),
      "editedAt": dateFormatter.string(from: note.editedAt),
      "userId": note.userId as Any,
      "priority": note.priority,
      "isSynced": note.isSynced,
      "status": note.status
    ]
  }
  
  @objc static func requiresMainQueueSetup() -> Bool {
    return false
  }
}
