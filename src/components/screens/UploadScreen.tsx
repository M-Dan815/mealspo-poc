import React, {useState, useRef} from "react";
import {
	Camera,
	Image,
	X,
	Plus,
	Minus,
	Clock,
	Users,
	ChevronRight,
	Trash2,
	GripVertical,
} from "lucide-react";
import {Header} from "../layout/Header";
import {PageWrapper} from "../layout/PageWrapper";
import {Button} from "../common/Button";
import {Input} from "../common/Input";
import {useApp} from "../../context/AppContext";
import {useAnalytics} from "../../context/AnalyticsContext";
import styles from "./UploadScreen.module.css";

interface IngredientInput {
	id: string;
	name: string;
	quantity: string;
	unit: string;
}

interface StepInput {
	id: string;
	text: string;
}

export const UploadScreen: React.FC = () => {
	const {navigate, dispatch} = useApp();
	const {trackButtonClick, trackEvent} = useAnalytics();

	// Form state
	const [currentStep, setCurrentStep] = useState<
		"media" | "details" | "ingredients" | "method" | "success"
	>("media");
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [prepTime, setPrepTime] = useState(15);
	const [cookTime, setCookTime] = useState(30);
	const [servings, setServings] = useState(4);
	const [ingredients, setIngredients] = useState<IngredientInput[]>([
		{id: "1", name: "", quantity: "", unit: "g"},
	]);
	const [steps, setSteps] = useState<StepInput[]>([{id: "1", text: ""}]);
	const [tags, setTags] = useState<string[]>([]);
	const [tagInput, setTagInput] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const fileInputRef = useRef<HTMLInputElement>(null);

	const units = [
		"g",
		"kg",
		"ml",
		"L",
		"cup",
		"tbsp",
		"tsp",
		"piece",
		"whole",
		"pinch",
	];

	// Handlers
	const handleBack = () => {
		trackButtonClick("upload_back", currentStep);
		if (currentStep === "media") {
			dispatch({type: "SET_ACTIVE_TAB", tab: "feed"});
		} else if (currentStep === "details") {
			setCurrentStep("media");
		} else if (currentStep === "ingredients") {
			setCurrentStep("details");
		} else if (currentStep === "method") {
			setCurrentStep("ingredients");
		}
	};

	const handleImageSelect = () => {
		trackButtonClick("select_image", "upload");
		fileInputRef.current?.click();
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			trackEvent("image_selected", {type: file.type, size: file.size});
			const reader = new FileReader();
			reader.onloadend = () => {
				setSelectedImage(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleRemoveImage = () => {
		trackButtonClick("remove_image", "upload");
		setSelectedImage(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	const handleContinue = () => {
		trackButtonClick("upload_continue", currentStep);
		if (currentStep === "media" && selectedImage) {
			setCurrentStep("details");
		} else if (currentStep === "details" && title.trim()) {
			setCurrentStep("ingredients");
		} else if (
			currentStep === "ingredients" &&
			ingredients.some((i) => i.name.trim())
		) {
			setCurrentStep("method");
		}
	};

	// Ingredient handlers
	const addIngredient = () => {
		setIngredients([
			...ingredients,
			{
				id: Date.now().toString(),
				name: "",
				quantity: "",
				unit: "g",
			},
		]);
	};

	const removeIngredient = (id: string) => {
		if (ingredients.length > 1) {
			setIngredients(ingredients.filter((i) => i.id !== id));
		}
	};

	const updateIngredient = (
		id: string,
		field: keyof IngredientInput,
		value: string
	) => {
		setIngredients(
			ingredients.map((i) => (i.id === id ? {...i, [field]: value} : i))
		);
	};

	// Step handlers
	const addStep = () => {
		setSteps([...steps, {id: Date.now().toString(), text: ""}]);
	};

	const removeStep = (id: string) => {
		if (steps.length > 1) {
			setSteps(steps.filter((s) => s.id !== id));
		}
	};

	const updateStep = (id: string, text: string) => {
		setSteps(steps.map((s) => (s.id === id ? {...s, text} : s)));
	};

	// Tag handlers
	const addTag = () => {
		if (
			tagInput.trim() &&
			tags.length < 5 &&
			!tags.includes(tagInput.trim().toLowerCase())
		) {
			setTags([...tags, tagInput.trim().toLowerCase()]);
			setTagInput("");
		}
	};

	const removeTag = (tag: string) => {
		setTags(tags.filter((t) => t !== tag));
	};

	// Submit handler
	const handleSubmit = async () => {
		trackButtonClick("publish_recipe", "upload");
		setIsSubmitting(true);

		trackEvent("recipe_submitted", {
			title,
			ingredientCount: ingredients.filter((i) => i.name.trim()).length,
			stepCount: steps.filter((s) => s.text.trim()).length,
			tags,
		});

		// Simulate upload delay
		await new Promise((resolve) => setTimeout(resolve, 2000));

		setIsSubmitting(false);
		setCurrentStep("success");
	};

	// Render functions
	const renderMediaStep = () => (
		<div className={styles.stepContent}>
			<div className={styles.mediaSection}>
				<input
					ref={fileInputRef}
					type="file"
					accept="image/*,video/*"
					onChange={handleFileChange}
					className={styles.hiddenInput}
				/>

				{selectedImage ? (
					<div className={styles.previewContainer}>
						<img src={selectedImage} alt="Preview" className={styles.preview} />
						<button
							className={styles.removeImageBtn}
							onClick={handleRemoveImage}
						>
							<X size={20} />
						</button>
					</div>
				) : (
					<div className={styles.uploadArea} onClick={handleImageSelect}>
						<div className={styles.uploadIcon}>
							<Camera size={48} />
						</div>
						<h3 className={styles.uploadTitle}>Add Photo or Video</h3>
						<p className={styles.uploadHint}>Tap to select from your gallery</p>

						<div className={styles.uploadOptions}>
							<div className={styles.uploadOption}>
								<Camera size={24} />
								<span>Camera</span>
							</div>
							<div className={styles.uploadOption}>
								<Image size={24} />
								<span>Gallery</span>
							</div>
						</div>
					</div>
				)}
			</div>

			<div className={styles.tips}>
				<h4>📸 Tips for great photos:</h4>
				<ul>
					<li>Use natural lighting</li>
					<li>Show the finished dish clearly</li>
					<li>Portrait orientation works best</li>
				</ul>
			</div>

			<div className={styles.bottomAction}>
				<Button
					variant="primary"
					size="large"
					fullWidth
					onClick={handleContinue}
					disabled={!selectedImage}
				>
					Continue
				</Button>
			</div>
		</div>
	);

	const renderDetailsStep = () => (
		<div className={styles.stepContent}>
			<div className={styles.formSection}>
				<div className={styles.miniPreview}>
					{selectedImage && <img src={selectedImage} alt="Preview" />}
				</div>

				<div className={styles.formGroup}>
					<label className={styles.label}>Recipe Title *</label>
					<Input
						placeholder="e.g., Creamy Garlic Pasta"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						fullWidth
					/>
				</div>

				<div className={styles.formGroup}>
					<label className={styles.label}>Description</label>
					<textarea
						className={styles.textarea}
						placeholder="Tell us about your recipe..."
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						rows={3}
					/>
				</div>

				<div className={styles.timeServingsRow}>
					<div className={styles.timeInput}>
						<label className={styles.label}>
							<Clock size={16} /> Prep Time
						</label>
						<div className={styles.numberControl}>
							<button onClick={() => setPrepTime(Math.max(0, prepTime - 5))}>
								<Minus size={16} />
							</button>
							<span>{prepTime} min</span>
							<button onClick={() => setPrepTime(prepTime + 5)}>
								<Plus size={16} />
							</button>
						</div>
					</div>

					<div className={styles.timeInput}>
						<label className={styles.label}>
							<Clock size={16} /> Cook Time
						</label>
						<div className={styles.numberControl}>
							<button onClick={() => setCookTime(Math.max(0, cookTime - 5))}>
								<Minus size={16} />
							</button>
							<span>{cookTime} min</span>
							<button onClick={() => setCookTime(cookTime + 5)}>
								<Plus size={16} />
							</button>
						</div>
					</div>
				</div>

				<div className={styles.servingsInput}>
					<label className={styles.label}>
						<Users size={16} /> Servings
					</label>
					<div className={styles.numberControl}>
						<button onClick={() => setServings(Math.max(1, servings - 1))}>
							<Minus size={16} />
						</button>
						<span>{servings}</span>
						<button onClick={() => setServings(servings + 1)}>
							<Plus size={16} />
						</button>
					</div>
				</div>

				<div className={styles.formGroup}>
					<label className={styles.label}>Tags (up to 5)</label>
					<div className={styles.tagsContainer}>
						{tags.map((tag) => (
							<span key={tag} className={styles.tag}>
								#{tag}
								<button onClick={() => removeTag(tag)}>
									<X size={14} />
								</button>
							</span>
						))}
						{tags.length < 5 && (
							<div className={styles.tagInputWrapper}>
								<input
									type="text"
									placeholder="Add tag..."
									value={tagInput}
									onChange={(e) => setTagInput(e.target.value)}
									onKeyPress={(e) => e.key === "Enter" && addTag()}
									className={styles.tagInput}
								/>
								<button onClick={addTag} className={styles.addTagBtn}>
									<Plus size={16} />
								</button>
							</div>
						)}
					</div>
				</div>
			</div>

			<div className={styles.bottomAction}>
				<Button
					variant="primary"
					size="large"
					fullWidth
					onClick={handleContinue}
					disabled={!title.trim()}
				>
					Continue
				</Button>
			</div>
		</div>
	);

	const renderIngredientsStep = () => (
		<div className={styles.stepContent}>
			<div className={styles.formSection}>
				<p className={styles.stepHint}>
					Add all ingredients needed for your recipe
				</p>

				<div className={styles.ingredientsList}>
					{ingredients.map((ingredient, index) => (
						<div key={ingredient.id} className={styles.ingredientRow}>
							<div className={styles.ingredientDrag}>
								<GripVertical size={16} />
							</div>
							<div className={styles.ingredientFields}>
								<input
									type="text"
									placeholder="Ingredient name"
									value={ingredient.name}
									onChange={(e) =>
										updateIngredient(ingredient.id, "name", e.target.value)
									}
									className={styles.ingredientName}
								/>
								<div className={styles.ingredientQtyUnit}>
									<input
										type="text"
										placeholder="Qty"
										value={ingredient.quantity}
										onChange={(e) =>
											updateIngredient(
												ingredient.id,
												"quantity",
												e.target.value
											)
										}
										className={styles.ingredientQty}
									/>
									<select
										value={ingredient.unit}
										onChange={(e) =>
											updateIngredient(ingredient.id, "unit", e.target.value)
										}
										className={styles.ingredientUnit}
									>
										{units.map((u) => (
											<option key={u} value={u}>
												{u}
											</option>
										))}
									</select>
								</div>
							</div>
							<button
								className={styles.removeBtn}
								onClick={() => removeIngredient(ingredient.id)}
								disabled={ingredients.length === 1}
							>
								<Trash2 size={18} />
							</button>
						</div>
					))}
				</div>

				<button className={styles.addMoreBtn} onClick={addIngredient}>
					<Plus size={20} />
					<span>Add Ingredient</span>
				</button>
			</div>

			<div className={styles.bottomAction}>
				<Button
					variant="primary"
					size="large"
					fullWidth
					onClick={handleContinue}
					disabled={!ingredients.some((i) => i.name.trim())}
				>
					Continue
				</Button>
			</div>
		</div>
	);

	const renderMethodStep = () => (
		<div className={styles.stepContent}>
			<div className={styles.formSection}>
				<p className={styles.stepHint}>Add step-by-step instructions</p>

				<div className={styles.stepsList}>
					{steps.map((step, index) => (
						<div key={step.id} className={styles.methodStep}>
							<div className={styles.stepNumber}>{index + 1}</div>
							<textarea
								placeholder={`Step ${index + 1}: What should they do?`}
								value={step.text}
								onChange={(e) => updateStep(step.id, e.target.value)}
								className={styles.stepTextarea}
								rows={2}
							/>
							<button
								className={styles.removeBtn}
								onClick={() => removeStep(step.id)}
								disabled={steps.length === 1}
							>
								<Trash2 size={18} />
							</button>
						</div>
					))}
				</div>

				<button className={styles.addMoreBtn} onClick={addStep}>
					<Plus size={20} />
					<span>Add Step</span>
				</button>
			</div>

			<div className={styles.bottomAction}>
				<Button
					variant="primary"
					size="large"
					fullWidth
					onClick={handleSubmit}
					loading={isSubmitting}
					disabled={!steps.some((s) => s.text.trim())}
				>
					Publish Recipe
				</Button>
			</div>
		</div>
	);

	const renderSuccessStep = () => (
		<div className={styles.successContent}>
			<div className={styles.successIcon}>🎉</div>
			<h2 className={styles.successTitle}>Recipe Published!</h2>
			<p className={styles.successText}>
				Your recipe is now live and ready to inspire food lovers everywhere.
			</p>

			{selectedImage && (
				<div className={styles.successPreview}>
					<img src={selectedImage} alt={title} />
					<div className={styles.successPreviewInfo}>
						<h3>{title}</h3>
						<p>
							{prepTime + cookTime} min • {servings} servings
						</p>
					</div>
				</div>
			)}

			<div className={styles.successStats}>
				<div className={styles.successStat}>
					<span className={styles.successStatValue}>
						{ingredients.filter((i) => i.name.trim()).length}
					</span>
					<span className={styles.successStatLabel}>Ingredients</span>
				</div>
				<div className={styles.successStat}>
					<span className={styles.successStatValue}>
						{steps.filter((s) => s.text.trim()).length}
					</span>
					<span className={styles.successStatLabel}>Steps</span>
				</div>
			</div>

			<div className={styles.successActions}>
				<Button
					variant="primary"
					size="large"
					fullWidth
					onClick={() => {
						trackButtonClick("view_recipe", "upload_success");
						dispatch({type: "SET_ACTIVE_TAB", tab: "profile"});
					}}
				>
					View on Profile
				</Button>
				<Button
					variant="outline"
					size="large"
					fullWidth
					onClick={() => {
						trackButtonClick("upload_another", "upload_success");
						setCurrentStep("media");
						setSelectedImage(null);
						setTitle("");
						setDescription("");
						setIngredients([{id: "1", name: "", quantity: "", unit: "g"}]);
						setSteps([{id: "1", text: ""}]);
						setTags([]);
					}}
				>
					Upload Another
				</Button>
			</div>
		</div>
	);

	const getStepTitle = () => {
		switch (currentStep) {
			case "media":
				return "New Recipe";
			case "details":
				return "Recipe Details";
			case "ingredients":
				return "Ingredients";
			case "method":
				return "Method";
			case "success":
				return "Success";
			default:
				return "New Recipe";
		}
	};

	const getProgress = () => {
		switch (currentStep) {
			case "media":
				return 25;
			case "details":
				return 50;
			case "ingredients":
				return 75;
			case "method":
				return 100;
			case "success":
				return 100;
			default:
				return 0;
		}
	};

	return (
		<>
			<Header
				variant="simple"
				title={getStepTitle()}
				showBack={currentStep !== "success"}
				onBack={handleBack}
			/>
			<PageWrapper pageName="upload" hasBottomNav={false} scrollable>
				<div className={styles.progressBar}>
					{currentStep !== "success" && (
						<div
							className={styles.progressFill}
							style={{width: `${getProgress()}%`}}
						/>
					)}
				</div>

				<div className={styles.container}>
					{currentStep === "media" && renderMediaStep()}
					{currentStep === "details" && renderDetailsStep()}
					{currentStep === "ingredients" && renderIngredientsStep()}
					{currentStep === "method" && renderMethodStep()}
					{currentStep === "success" && renderSuccessStep()}
				</div>
			</PageWrapper>
		</>
	);
};
