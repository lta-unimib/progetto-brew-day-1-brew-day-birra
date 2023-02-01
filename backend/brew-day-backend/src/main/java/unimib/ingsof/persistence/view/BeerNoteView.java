package unimib.ingsof.persistence.view;

import jakarta.persistence.Id;

public class BeerNoteView {

	@Id
	private String noteID;
	private String beerID;
	private String noteType;
	private String description;
	
	public BeerNoteView() {
		super();
	}

	public BeerNoteView(String beerID, String noteID, String noteType, String description) {
		super();
		this.noteID = noteID;
		this.beerID = beerID;
		this.noteType = noteType;
		this.description = description;
	}
	
	public String getNoteID() {
		return noteID;
	}
	public void setNoteID(String noteID) {
		this.noteID = noteID;
	}
	public String getBeerID() {
		return beerID;
	}
	public void setBeerID(String beerID) {
		this.beerID = beerID;
	}
	public String getNoteType() {
		return noteType;
	}
	public void setNoteType(String noteType) {
		this.noteType = noteType;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}

}
