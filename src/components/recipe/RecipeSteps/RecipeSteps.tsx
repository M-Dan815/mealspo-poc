import React, {useState} from "react";
import {Check} from "lucide-react";
import styles from "./RecipeSteps.module.css";

interface RecipeStepsProps {
	steps: string[];
}

export const RecipeSteps: React.FC<RecipeStepsProps> = ({steps}) => {
	const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

	const toggleStep = (index: number) => {
		setCompletedSteps((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(index)) {
				newSet.delete(index);
			} else {
				newSet.add(index);
			}
			return newSet;
		});
	};

	return (
		<div className={styles.stepsContainer}>
			<h3 className={styles.title}>Method</h3>

			<ol className={styles.stepsList}>
				{steps.map((step, index) => {
					const isCompleted = completedSteps.has(index);

					return (
						<li
							key={index}
							className={`${styles.step} ${
								isCompleted ? styles.completed : ""
							}`}
							onClick={() => toggleStep(index)}
						>
							<div className={styles.stepNumber}>
								{isCompleted ? (
									<Check size={16} strokeWidth={3} />
								) : (
									<span>{index + 1}</span>
								)}
							</div>
							<p className={styles.stepText}>{step}</p>
						</li>
					);
				})}
			</ol>
		</div>
	);
};
