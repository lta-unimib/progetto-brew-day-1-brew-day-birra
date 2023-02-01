package unimib.ingsof.persistence.view;

import java.util.List;

import unimib.ingsof.persistence.model.BeerNote;

public class BeerView {
	
	private String beerID;
	private String name; 
	private String recipeID;
	private List<BeerNote> result;

	public BeerView() {
		super();
	}

	public BeerView(String beerID, String name, String recipeID, List<BeerNote> result) {
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

	public List<BeerNote> getResult() {
		return result;
	}

	public void setResult(List<BeerNote> result) {
		this.result = result;
	}
	
	

}
