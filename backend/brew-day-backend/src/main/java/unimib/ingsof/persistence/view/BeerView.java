package unimib.ingsof.persistence.view;

import java.util.ArrayList;

public class BeerView {
	
	private String beerID;
	private String name; 
	private String recipeID;
	private ArrayList<BeerNoteView> result;

	public BeerView() {
		super();
	}

	public BeerView(String beerID, String name, String recipeID, ArrayList<BeerNoteView> result) {
		super();
		this.beerID = beerID;
		this.name = name;
		this.recipeID = recipeID;
		this.result = result;
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

	public ArrayList<BeerNoteView> getResult() {
		return result;
	}

	public void setResult(ArrayList<BeerNoteView> result) {
		this.result = result;
	}
	
	

}
