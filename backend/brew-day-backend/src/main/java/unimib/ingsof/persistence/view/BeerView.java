package unimib.ingsof.persistence.view;

import java.util.List;

import unimib.ingsof.persistence.model.BeerNote;

public class BeerView {
	
	private String beerID;
	private String name; 
	private String recipeID;
	private List<BeerNote> notes;

	public BeerView() {
		super();
	}

	public BeerView(String beerID, String name, String recipeID, List<BeerNote> notes) {
		super();
		this.beerID = beerID;
		this.name = name;
		this.recipeID = recipeID;
		this.notes = notes;
	}

	public String getBeerID() {
		return beerID;
	}

	public void setBeerID(String beerID) {
		this.beerID = beerID;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getRecipeID() {
		return recipeID;
	}

	public void setRecipeID(String recipeID) {
		this.recipeID = recipeID;
	}

	public List<BeerNote> getNotes() {
		return notes;
	}

	public void setNotes(List<BeerNote> result) {
		this.notes = result;
	}
}
